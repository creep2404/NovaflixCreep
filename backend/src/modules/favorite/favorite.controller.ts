import { typedHandler } from "@/common/utils/typedRoute";
import {
  addFavoriteService,
  getFavoriteStatusService,
  getMyFavoritesService,
  removeFavoriteService,
} from "./favorite.service";
import { asyncHandler } from "@/common/utils/asyncHandler";
import { FavoriteParamInput } from "./dto/favorite-param";
import { successResponse } from "@/common/utils/successResponse";
import { Request, Response } from "express";

export const addFavorite = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;
    const userId = req.user!.id;

    const result = await addFavoriteService(userId, movieId);

    return successResponse(res, result, "Added favorite successfully");
  }),
);

export const removeFavorite = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;
    const userId = req.user!.id;

    const result = await removeFavoriteService(userId, movieId);

    return successResponse(res, result, "Removed favorite successfully");
  }),
);

export const getFavoriteStatus = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;
    const userId = req.user!.id;

    const result = await getFavoriteStatusService(userId, movieId);

    return successResponse(res, result, "Get favorite status successfully");
  }),
);

export const getMyFavorites = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const result = await getMyFavoritesService(userId);

    return successResponse(res, result, "Get favorites successfully");
  },
);
