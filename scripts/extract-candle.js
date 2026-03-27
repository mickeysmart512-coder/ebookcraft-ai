
const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        const dataBuffer = fs.readFileSync('Candle making with Preshy.pdf');
        // pdf-parse might export the function as a property depending on the version
        const data = await (typeof pdf === 'function' ? pdf(dataBuffer) : pdf.default(dataBuffer));
        fs.writeFileSync('candle_text.txt', data.text);
        console.log('Extraction complete. Saved to candle_text.txt');
    } catch (e) {
        console.error('Extraction failed:', e);
    }
}

extract();
