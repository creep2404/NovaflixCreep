import { Router } from "express";
import { getStreamingCookie } from "./streaming.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.get("/cookie", authMiddleware, getStreamingCookie);

export default router;