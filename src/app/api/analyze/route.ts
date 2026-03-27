import { NextRequest, NextResponse } from 'next/server';
import { extractPdfContent, cleanText } from '@/lib/pdf-processor';
import { analyzeEbookContent } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 });
        }

        // Convert File to Buffer for pdf-parse
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 1. Extract Text
        const pdfContent = await extractPdfContent(buffer);
        const cleanedText = cleanText(pdfContent.text);

        // 2. Analyze with Gemini
        const analysis = await analyzeEbookContent(cleanedText);

        // 3. Return results
        return NextResponse.json({
            success: true,
            analysis,
            text: cleanedText.slice(0, 50000), // Return a chunk of text for rendering
            numPages: pdfContent.numPages
        });

    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json({
            error: error.message || "Failed to analyze ebook"
        }, { status: 500 });
    }
}
