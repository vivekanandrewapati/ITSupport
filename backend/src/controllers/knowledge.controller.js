import { KnowledgeArticle } from "../models/KnowledgeArticle.model.js";
import { getVectorFromText } from "../services/embedding.service.js";
import { upsertVectors } from "../services/vector.service.js";

export const addknowledge = async (req, res) => {
    try {
        const { title, content, url } = req.body || {};

        if (!title?.trim() || !content?.trim() || !url?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const knowledgeArticle = await KnowledgeArticle.create({
            title,
            content,
            url
        });
        const textcontent = `${title}\n\n${content}`;
        const vector = await getVectorFromText(textcontent);
        if (vector.length == 0) console.error("embedding not generated");
        console.log(vector.length);
        console.log(vector.slice(0, 10));

        const result = await upsertVectors(vector, knowledgeArticle._id.toString(), {
            title, content, url
        });

        if (!result) {
            console.error("vector upsert failed for id", knowledgeArticle._id);
            await KnowledgeArticle.findByIdAndDelete(knowledgeArticle._id);
            return res.status(500).json({
                success: false,
                message: "error in adding knowledge"
            })
        }

        return res.status(201).json({
            success: true,
            message: "knowledge article added successfully",
            data: knowledgeArticle
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "error in adding knowledge",
            error: error.message
        })

    }
}