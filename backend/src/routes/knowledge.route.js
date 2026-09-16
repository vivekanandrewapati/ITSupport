import express from "express";
import { addknowledge, uploadpdf } from "../controllers/knowledge.controller.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { userAuthMiddleware } from "../middleware/user.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", userAuthMiddleware, roleMiddleware("admin"), addknowledge);
router.post("/pdf", userAuthMiddleware, roleMiddleware("admin"), upload.single("pdf"), uploadpdf)

export default router;