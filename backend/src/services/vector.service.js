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
        return false;

    }

}