import { pineconeIndex } from "../config/pinecone.js";
import { getVectorFromText } from "../services/embedding.service.js";
import { getSearchResult } from "../services/vector.service.js";


export const searchQuery = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query?.trim()) {
            return res.status(400).json({
                success: false,
                message: "query is required"
            })
        }
        const vector = await getVectorFromText(query.trim());
        const topK = process.env.TOP_K;
        const threshold = process.env.SEARCH_THRESHOLD;
        if (vector.length == 0) {
            console.error("embedding not generated")
            return res.status(500).json({
                success: false,
                message: "error in generating embeddings"
            })
        }
        const includeMetadata = true;
        const { matches } = await getSearchResult(topK, vector, includeMetadata)


        const filteredResults = (matches || []).filter(res => res.score > threshold);
        console.log("search results", filteredResults);
        const data = filteredResults.map(res => ({
            id: res.id,
            score: res.score,
            title: res.metadata.title,
            url: res.metadata.url
        }));

        return res.status(200).json({
            success: true,
            message: "search results",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "error in searching",
            error: error.message
        })
    }
}