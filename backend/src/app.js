
import express from "express";
import health from "./routes/health.route.js"


const app = express();

app.use(express.json());
app.use("/api/health", health)


export default app;