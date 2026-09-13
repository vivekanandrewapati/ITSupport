import { getVectorFromText } from "../services/embedding.service.js";
import { upsertVectors } from "../services/vector.service.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
    const vector = await getVectorFromText("how to connect printer");
    const result = await upsertVectors(vector, "1", { title: "printer setup", url: "http://www.google.com" });
    console.log(result);
}
main();
