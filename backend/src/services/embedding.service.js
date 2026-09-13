import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import "dotenv/config";

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-001"
})

export const getVectorFromText = async (text) => {
    try {
        if (!text?.trim()) {
            console.error("text for generating vectors is mandatory");
            return [];
        }

        const vector = await embeddings.embedQuery(text.trim());
        return vector;

    } catch (error) {
        console.error("Error generating embeddings:", error);
        return [];
    }
}