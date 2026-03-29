import mammoth from 'mammoth';

export type EbookDocxContent = {
    text: string;
    html: string;
    metadata: Record<string, string>;
    numPages: number;
};

export async function extractDocxContent(buffer: Buffer): Promise<EbookDocxContent> {
    try {
        console.log('[docx-processor] Starting extraction...');

        // 1. Extract clean HTML for rendering
        const htmlResult = await mammoth.convertToHtml({ buffer });
        if (htmlResult.messages.length > 0) {
            console.log('[docx-processor] HTML extraction messages:', htmlResult.messages);
        }

        // 2. Extract raw text for Gemini AI analysis
        const textResult = await mammoth.extractRawText({ buffer });
        if (textResult.messages.length > 0) {
            console.log('[docx-processor] Text extraction messages:', textResult.messages);
        }

        console.log('[docx-processor] Extraction successful');
        return {
            text: textResult.value,
            html: htmlResult.value,
            metadata: {}, // mammoth doesn't expose standard doc metadata easily so we leave empty
            numPages: 1 // since it's fluid HTML, docx doesn't give us a rigid page count
        };
    } catch (error: any) {
        console.error('[docx-processor] Extraction failed:', error);
        throw new Error(`Failed to parse DOCX file: ${error.message || 'Unknown error'}`);
    }
}
