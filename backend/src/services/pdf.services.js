import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/core/text_splitter";


export const processPdfFile = async (buffer) => {
    try {
        const loader = new PDFLoader(buffer)
        const docs = await loader.load();
        console.log("docs from pdf", docs)
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const chunks = await splitter.splitDocuments(docs)
        return chunks
    } catch (error) {
        throw error;
    }

}
