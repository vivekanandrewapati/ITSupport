
import express from "express";
import health from "./routes/health.route.js"
import knowledge from "./routes/knowledge.route.js"


const app = express();

app.use(express.json());
app.use("/api/health", health)
app.use("/api/knowledge", knowledge)


export default app;