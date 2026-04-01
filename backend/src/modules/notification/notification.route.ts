import { Router } from "express";
import { getNotifications, markAsRead } from "./notification.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getNotifications);
router.patch("/:id/read", authMiddleware, markAsRead);

export default router;