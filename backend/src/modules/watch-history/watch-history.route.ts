import { Router } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  updateProgress,
  getWatchHistoryByMovie,
} from "./watch-history.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: WatchHistory
 *   description: APIs to manage user watch history
 */

/**
 * @swagger
 * /watch-history/progress:
 *   post:
 *     summary: Update watch progress
 *     description: Update the current progress of a video/movie for the authenticated user
 *     tags: [WatchHistory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [movieId, progress]
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: "123"
 *               progress:
 *                 type: number
 *                 description: Progress in seconds
 *                 example: 120
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/progress", authMiddleware, updateProgress);

/**
 * @swagger
 * /watch-history/{movieId}:
 *   get:
 *     summary: Get watch history by movieId
 *     description: Returns the watch progress of the current authenticated user for a specific movie.
 *     tags: [WatchHistory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: Watch history retrieved successfully (can be null if no history exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 movieId:
 *                   type: string
 *                 progress:
 *                   type: number
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Watch history not found
 */
router.get("/:movieId", authMiddleware, getWatchHistoryByMovie);

export default router;