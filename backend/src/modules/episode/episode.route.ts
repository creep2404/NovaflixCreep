import { Router } from "express";
import {
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getNextEpisode,
  getEpisodePlayback,
} from "./episode.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import {
  validateRequestBody,
  validateRequestParams,
} from "@/common/validations/validate";
import { paramIdSchema } from "@/common/dto/param.dto";
import { createEpisodeSchema } from "./dto/create-episode.dto";
import { updateEpisodeSchema } from "./dto/update-episode.dto";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Episodes
 *   description: Episode management APIs
 */

/**
 * @swagger
 * /movies/{movieId}/episodes:
 *   post:
 *     summary: Create episode
 *     description: Create a new episode for a movie
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Episode created successfully
 */
router.post(
  "/movies/:movieId/episodes",
  authMiddleware,
  validateRequestParams(paramIdSchema),
  validateRequestBody(createEpisodeSchema),
  createEpisode,
);

/**
 * @swagger
 * /episodes/{id}:
 *   patch:
 *     summary: Update episode
 *     description: Update an existing episode
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Episode updated successfully
 */
router.patch(
  "/episodes/:id",
  authMiddleware,
  validateRequestParams(paramIdSchema),
  validateRequestBody(updateEpisodeSchema),
  updateEpisode,
);

/**
 * @swagger
 * /episodes/{id}:
 *   delete:
 *     summary: Delete episode
 *     description: Delete an episode
 *     tags: [Episodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Episode deleted successfully
 */
router.delete(
  "/episodes/:id",
  authMiddleware,
  validateRequestParams(paramIdSchema),
  deleteEpisode,
);


router.get("/:id/play", validateRequestParams(paramIdSchema), getEpisodePlayback);

router.get(
  "/:id/next",

  validateRequestParams(paramIdSchema),

  getNextEpisode,
);

export default router;
