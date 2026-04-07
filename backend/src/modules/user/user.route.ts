import { Router } from "express";
import { getContinueWatching } from "@/modules/movie/movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.get("/me/continue-watching", authMiddleware, getContinueWatching);

export default router;