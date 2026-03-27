
const fs = require('fs');
const pdf = require('pdf-parse');

async function extractFull() {
    try {
        const dataBuffer = fs.readFileSync('Candle making with Preshy.pdf');
        const options = {
            // No custom logic needed, just standard extraction
        };
        const data = await pdf(dataBuffer, options);
        fs.writeFileSync('full_candle_text.txt', data.text);
        console.log(`Extraction complete. Total Pages: ${data.numpages}. Text saved to full_candle_text.txt`);
    } catch (e) {
        console.error('Full extraction failed:', e);
    }
}

extractFull();
