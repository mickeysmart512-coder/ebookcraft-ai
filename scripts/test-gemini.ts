import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testGemini() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API key found in .env.local");
        return;
    }

    console.log("Using API Key starting with:", key.substring(0, 5));
    const genAI = new GoogleGenerativeAI(key);

    try {
        console.log("Listing models...");
        // In newer versions, listModels might be on the client or need a specific approach
        // But let's just try a simple generateContent with gemini-pro
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you there?");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error: any) {
        console.error("Gemini Test Failed:");
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        if (error.response) {
            console.error("Response:", await error.response.text());
        }
    }
}

testGemini();
