import { searchQuery } from "../controllers/search.controller.js";
import express from "express";
import { userAuthMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/", userAuthMiddleware, searchQuery)

export default router;