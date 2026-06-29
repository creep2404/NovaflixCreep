import { authMiddleware } from "@/common/middleware/auth.middleware";
import { validateRequestParams } from "@/common/validations/validate";
import { favoriteParamSchema } from "./dto/favorite-param";
import { addFavorite, getFavoriteStatus, getMyFavorites, removeFavorite } from "./favorite.controller";
import { Router } from "express";

const router = Router();

router.post(
  "/:movieId",
  authMiddleware,
  validateRequestParams(favoriteParamSchema),
  addFavorite,
);

router.delete(
  "/:movieId",
  authMiddleware,
  validateRequestParams(favoriteParamSchema),
  removeFavorite,
);

router.get(
  "/:movieId/status",
  authMiddleware,
  validateRequestParams(favoriteParamSchema),
  getFavoriteStatus,
);

router.get(
  "/me",
  authMiddleware,
  getMyFavorites,
);

export default router;