import crypto from "crypto";

const normalizeText = (value) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
};

export const generateFingerprint = ({ title, url, content }) => {
    const normalizedTitle = normalizeText(title);
    const normalizedUrl = normalizeText(url);
    const normalizedContent = normalizeText(content);

    const rawData = `${normalizedTitle}|${normalizedUrl}|${normalizedContent}`;

    return crypto
        .createHash("sha256")
        .update(rawData)
        .digest("hex");
};