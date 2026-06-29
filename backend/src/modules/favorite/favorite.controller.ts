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

export const addFavorite = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;

    const result = await addFavoriteService(req.user.id, movieId);

    return successResponse(res, result, "Added favorite successfully");
  }),
);

export const removeFavorite = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;

    const result = await removeFavoriteService(req.user.id, movieId);

    return successResponse(res, result, "Removed favorite successfully");
  }),
);

export const getFavoriteStatus = asyncHandler(
  typedHandler<unknown, unknown, FavoriteParamInput>(async (req, res) => {
    const { movieId } = req.validated.params;

    const result = await getFavoriteStatusService(req.user.id, movieId);

    return successResponse(res, result, "Get favorite status successfully");
  }),
);

export const getMyFavorites = asyncHandler(async (req: any, res: Response) => {
  const result = await getMyFavoritesService(req.user.id);

  return successResponse(res, result, "Get favorites successfully");
});
