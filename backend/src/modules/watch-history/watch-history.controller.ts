import { Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import {
  updateProgressService,
  getWatchHistoryService,
} from "./watch-history.service";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { successResponse } from "@/common/utils/successResponse";

export const updateProgress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    const result = await updateProgressService(userId, req.body);

    return successResponse(res, result, "Update progress successfully");
  },
);

export const getWatchHistory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    const data = await getWatchHistoryService(userId);

    return successResponse(res, data, "Get watch history successfully");
  },
);
