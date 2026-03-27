import path from 'path';
import { pathToFileURL } from 'url';

export type EbookContent = {
    text: string;
    metadata: Record<string, string>;
    numPages: number;
};

export async function extractPdfContent(buffer: Buffer): Promise<EbookContent> {
    try {
        console.log('[pdf-processor] Starting extraction...');
        const { PDFParse } = await import('pdf-parse');

        // Fix for "Setting up fake worker failed" in Next.js/Turbopack on Windows
        const workerPath = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs');
        const workerUrl = pathToFileURL(workerPath).href;
        PDFParse.setWorker(workerUrl);
        console.log(`[pdf-processor] Worker set to: ${workerUrl}`);

        const data = new Uint8Array(buffer);
        console.log(`[pdf-processor] Buffer size: ${data.length} bytes`);

        const parser = new PDFParse({ data });
        const textResult = await parser.getText();
        const infoResult = await parser.getInfo();

        console.log('[pdf-processor] Extraction successful');
        return {
            text: textResult.text,
            metadata: infoResult.info as Record<string, string>,
            numPages: textResult.total,
        };
    } catch (error: any) {
        console.error('[pdf-processor] Extraction failed:', error);
        throw new Error(`Failed to parse PDF file: ${error.message || 'Unknown error'}`);
    }
}

export function cleanText(text: string): string {
    // Simple cleaning: remove excessive newlines and weird chars
    return text.replace(/\n{3,}/g, '\n\n').trim();
}
