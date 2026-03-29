import { NextRequest, NextResponse } from 'next/server';
import { extractDocxContent } from '@/lib/docx-processor';
import { cleanText } from '@/lib/pdf-processor';
import { analyzeEbookContent } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const validTypes = [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
        ];

        if (!validTypes.includes(file.type) && !file.name.endsWith('.docx')) {
            return NextResponse.json({ error: "Only .docx files are supported" }, { status: 400 });
        }

        // Convert File to Buffer for mammoth
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 1. Extract Text & HTML
        const docxContent = await extractDocxContent(buffer);
        const cleanedText = cleanText(docxContent.text);

        // 2. Analyze with Gemini
        const analysis = await analyzeEbookContent(cleanedText);

        // 3. Return results
        return NextResponse.json({
            success: true,
            analysis,
            text: docxContent.html, // Return robust HTML for rendering
            rawTextChunk: cleanedText.slice(0, 50000), // Raw text if needed
            numPages: docxContent.numPages
        });

    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json({
            error: error.message || "Failed to analyze ebook"
        }, { status: 500 });
    }
}
