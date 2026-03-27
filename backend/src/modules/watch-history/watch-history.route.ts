import { Router } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  updateProgress,
  getWatchHistory,
} from "./watch-history.controller";

const router = Router();

router.post("/progress", authMiddleware, updateProgress);
router.get("/", authMiddleware, getWatchHistory);

export default router;