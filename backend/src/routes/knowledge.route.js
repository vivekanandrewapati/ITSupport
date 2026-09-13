import express from "express";
import { addknowledge } from "../controllers/knowledge.controller.js";

const router = express.Router();

router.post("/", addknowledge);

export default router;