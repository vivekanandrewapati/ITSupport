
import express from "express";
import health from "./routes/health.route.js"
import knowledge from "./routes/knowledge.route.js"
import search from "./routes/search.route.js"
import user from "./routes/user.route.js"


const app = express();

app.use(express.json());
app.use("/api/health", health)
app.use("/api/knowledge", knowledge)
app.use("/api/search", search)
app.use("/api/user", user)


export default app;