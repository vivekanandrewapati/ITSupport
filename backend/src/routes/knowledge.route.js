import express from "express";
import { addknowledge } from "../controllers/knowledge.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { userAuthMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/", userAuthMiddleware, roleMiddleware("admin"), addknowledge);

export default router;