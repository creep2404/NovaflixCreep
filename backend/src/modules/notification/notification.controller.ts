import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  getNotificationsService,
  markNotificationReadService,
} from "./notification.service";
import { AuthRequest } from "@/common/middleware/auth.middleware";
import { successResponse } from "@/common/utils/successResponse";
import { typedHandler } from "@/common/utils/typedRoute";

export const getNotifications = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const data = await getNotificationsService(req.user!.id);

    return successResponse(res, data, "Get notifications successfully");
  },
);

export const markAsRead = asyncHandler(
  typedHandler<unknown, unknown, { id: string }>(async (req, res) => {
    await markNotificationReadService(req.validated.params.id);

    return successResponse(res, null, "Mark as read successfully");
  }),
);
