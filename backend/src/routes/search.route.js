import { searchQuery } from "../controllers/search.controller.js";
import express from "express";

const router = express.Router();

router.post("/", searchQuery)

export default router;