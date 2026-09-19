import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "../config/pinecone.js";



export const upsertVectors = async (values, id, metadata) => {
    try {
        const index = pineconeIndex;
        await index.upsert({
            records: [
                {
                    id,
                    values,
                    metadata
                }
            ]
        });
        return true;
    } catch (error) {
        console.error("Error upserting vectors:", error);
        throw error;
    }

}

export const getSearchResult = async (topK, vector, includeMetadata) => {
    try {
        const results = await pineconeIndex.query({
            topK,
            vector,
            includeMetadata: true,
        });
        console.log("vector search results ", results);
        return results;
    } catch (error) {
        console.log("Error searching vectors:", error);
        return [];
    }
}
export const findSimilarVector = async (vector) => {
    const result = await pineconeIndex.query({
        vector,
        topK: 1,
        includeMetadata: true,
        includeValues: false
    });

    return result.matches?.[0] || null;
};