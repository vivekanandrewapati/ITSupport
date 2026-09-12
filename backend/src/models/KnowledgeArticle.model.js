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
    }

}, { timestamps: true });


export const KnowledgeArticle = mongoose.model("KnowledgeArticle", knowledgeArticleSchema);