import mongoose from "mongoose";

const knowledgeArticleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    url: {
        type: String,
    },
    fingerprint: {
        type: String,
        index: true,
        unique: true,
        required: true
    }

}, { timestamps: true });


export const KnowledgeArticle = mongoose.model("KnowledgeArticle", knowledgeArticleSchema);