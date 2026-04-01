import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  getNotificationsService,
  markNotificationReadService,
} from "./notification.service";
import { AuthRequest } from "@/common/middleware/auth.middleware";

export const getNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await getNotificationsService(req.user!.id);

    res.json({
      success: true,
      data,
    });
  }
);

export const markAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    await markNotificationReadService(req.params.id);

    res.json({
      success: true,
      message: "Notification marked as read",
    });
  }
);