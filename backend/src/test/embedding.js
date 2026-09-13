import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { cosineSimilarity } from "@langchain/core/utils/math";
import dotenv from "dotenv";
dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
});

const vector1 = await embeddings.embedQuery(
    "How to reset my password?"
);

const vector2 = await embeddings.embedQuery(
    "is there any way to resset my pass"
)

const [[score]] = cosineSimilarity([vector1], [vector2]);

console.log(`Similarity score: ${score}`);
console.log(vector1.length);