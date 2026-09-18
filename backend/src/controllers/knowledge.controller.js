import { KnowledgeArticle } from "../models/KnowledgeArticle.model.js";
import { getVectorFromText } from "../services/embedding.service.js";
import { upsertVectors } from "../services/vector.service.js";
import { extractPdfText, parseData } from "../services/pdf.service.js";

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

export const uploadpdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required. Make sure the form-data key is named 'pdf'"
            });
        }
        const documents = await extractPdfText(req.file.buffer);
        const parsedContent = await parseData(documents);

        console.log("Parsed PDF content:", parsedContent);

        return res.status(200).json({
            success: true,
            message: "PDF uploaded and extracted successfully",
            data: parsedContent
        });
    } catch (error) {
        console.error("error in uploading pdf:", error);
        return res.status(500).json({
            success: false,
            message: "error in uploading pdf",
            error: error.message
        });
    }
}