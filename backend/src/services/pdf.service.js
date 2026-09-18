import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const extractPdfText = async (buffer) => {
    const blob = new Blob([buffer]);

    const loader = new PDFLoader(blob);

    const documents = await loader.load();

    return documents;
};

export const parseData = async (documents) => {
    try {
        if (!documents || documents.length === 0) return [];

        const fullText = documents.map((doc) => doc.pageContent || "").join("\n---\n");

        const blocks = fullText.split(/---/);

        const articles = [];

        for (const block of blocks) {
            const lines = block.split(/\r?\n/);
            let title = "";
            let url = "";
            let contentLines = [];
            let readingContent = false;

            for (const line of lines) {
                if (line.match(/^Title:\s*/i)) {
                    title = line.replace(/^Title:\s*/i, "").trim();
                    readingContent = false;
                } else if (line.match(/^URL:\s*/i)) {
                    url = line.replace(/^URL:\s*/i, "").trim();
                    readingContent = false;
                } else if (line.match(/^Content:\s*/i)) {
                    const inlineContent = line.replace(/^Content:\s*/i, "").trim();
                    if (inlineContent) {
                        contentLines.push(inlineContent);
                    }
                    readingContent = true;
                } else if (readingContent) {
                    const trimmed = line.trim();
                    if (trimmed) {
                        contentLines.push(trimmed);
                    }
                }
            }

            const content = contentLines.join("\n").trim();

            if (title || content) {
                articles.push({
                    title,
                    url,
                    content
                });
            }
        }

        return articles;
    } catch (error) {
        console.error("error in parsing data", error);
        return [];
    }
}