import { Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import {
  updateProgressService,
  getWatchHistoryByMovieService,
} from "./watch-history.service";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { successResponse } from "@/common/utils/successResponse";

export const updateProgress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    //const userId = req.user!.userId;
    const userId = 'b6d981b4-ca42-4997-a930-486203412cf1'
    const result = await updateProgressService(userId, req.body);
    return successResponse(res, result, "Update progress successfully");
  },
);

export const getWatchHistoryByMovie = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // const userId = req.user.id;
    const { movieId } = req.params;
    const userId = 'b6d981b4-ca42-4997-a930-486203412cf1'
    const data = await getWatchHistoryByMovieService(userId, movieId);

    return successResponse(res, data, "Get watch history successfully");
  },
);
