import { GoogleGenerativeAI } from "@google/generative-ai";
import { TEMPLATES, EbookTemplate } from './templates';

export type TemplateRecommendation = {
    templateId: string;
    confidence: number;
    reasoning: string;
};

export type ContentProfile = {
    genre: string;
    tone: string;
    targetAudience: string;
    summary: string;
    detectedStructures: {
        hasNumberedSteps: boolean;
        hasBulletLists: boolean;
        hasProTips: boolean;
        hasTables: boolean;
        chapterCount: number;
    };
};

export type AnalysisResult = {
    contentProfile: ContentProfile;
    recommendations: TemplateRecommendation[];
    suggestedTitle: string;
};

export async function analyzeEbookContent(text: string): Promise<AnalysisResult> {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Try multiple model variants and API versions
    // Updated for 2026 model availability (Gemini 2.5+)
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-flash-latest",
        "gemini-2.0-flash-exp",
        "gemini-2.5-pro",
        "gemini-pro-latest"
    ];
    const apiVersions = ['v1beta', 'v1'];
    let lastError: any = null;

    // Use a substantial sample for analysis
    const sample = text.slice(0, 10000);

    const prompt = `
    Analyze this ebook text deeply and provide a comprehensive Content Profile and Template Recommendations.
    Text Sample: "${sample}"
    
    Available Templates Library:
    ${TEMPLATES.map(t => `- ID: ${t.id}
      Name: ${t.name}
      Category: ${t.category}
      Strengths: ${t.strengths.join(', ')}
      Description: ${t.description}`).join('\n\n')}
    
    Instructions:
    1. EXRACT CONTENT PROFILE:
       - Identify the primary genre and tone.
       - Determine the target audience and a brief summary.
       - Detect structural elements: Does it have numbered steps? Bullet lists? Pro-tips/Callouts? Tables? Estimate chapter count.
    2. RECOMEND TOP 6 TEMPLATES:
       - Score all templates against the content profile.
       - Pick the Top 6 best matches.
       - For each, provide a confidence score (0.0 to 1.0) and a specific reasoning (e.g., "The 'Warm Cozy Craft' template handles your 12-page candle-making guide's many numbered steps with elegant, bordered cards that match the handmade feel.")
    3. SUGGEST TITLE:
       - Provide a professional, engaging title based on the content.
    
    Return ONLY a valid JSON object with this exact structure:
    {
      "contentProfile": {
        "genre": "...",
        "tone": "...",
        "targetAudience": "...",
        "summary": "...",
        "detectedStructures": {
            "hasNumberedSteps": true/false,
            "hasBulletLists": true/false,
            "hasProTips": true/false,
            "hasTables": true/false,
            "chapterCount": 5
        }
      },
      "recommendations": [
        { "templateId": "...", "confidence": 0.95, "reasoning": "..." },
        ... (up to 6)
      ],
      "suggestedTitle": "..."
    }
    `;

    for (const modelName of modelsToTry) {
        for (const apiVersion of apiVersions) {
            try {
                console.log(`[gemini] Attempting analysis with model: ${modelName} (${apiVersion})`);
                const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const responseText = response.text();

                console.log(`[gemini] Analysis successful with ${modelName} (${apiVersion})`);

                // Extract JSON from response (handling potential markdown blocks)
                const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("Failed to extract JSON from AI response");
                }

                const data = JSON.parse(jsonMatch[0]) as AnalysisResult;

                // Validate template IDs in recommendations
                data.recommendations = data.recommendations.filter(rec =>
                    TEMPLATES.find(t => t.id === rec.templateId)
                );

                if (data.recommendations.length === 0) {
                    data.recommendations.push({
                        templateId: 'modern-minimal',
                        confidence: 0.5,
                        reasoning: "Fallback choice due to no matching templates found."
                    });
                }

                return data;
            } catch (error: any) {
                console.error(`[gemini] Error with ${modelName} (${apiVersion}):`, error.message || error);
                lastError = error;
                const status = error.status || (error.response?.status);
                if (status === 429 || status === 503 || status === 404 || error.message?.includes('not supported')) {
                    continue;
                }
                break;
            }
        }
    }

    throw lastError || new Error("Failed to analyze content with any model.");
}
