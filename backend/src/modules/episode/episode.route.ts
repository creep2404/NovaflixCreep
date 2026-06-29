import { Router } from "express";
import {
  // createEpisode,
  // updateEpisode,
  // deleteEpisode,
  getNextEpisode,
} from "./episode.controller";
import {
  validateRequestParams,
} from "@/common/validations/validate";
import { paramIdSchema } from "@/common/dto/param.dto";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Episodes
 *   description: Episode management APIs
 */

// router.post(
//   "/movies/:movieId/episodes",
//   authMiddleware,
//   validateRequestParams(paramIdSchema),
//   validateRequestBody(createEpisodeSchema),
//   createEpisode,
// );

// router.patch(
//   "/episodes/:id",
//   authMiddleware,
//   validateRequestParams(paramIdSchema),
//   validateRequestBody(updateEpisodeSchema),
//   updateEpisode,
// );

// router.delete(
//   "/episodes/:id",
//   authMiddleware,
//   validateRequestParams(paramIdSchema),
//   deleteEpisode,
// );

router.get(
  "/:id/next",
  validateRequestParams(paramIdSchema),
  getNextEpisode,
);

export default router;
