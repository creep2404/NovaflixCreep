import { Router } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import {
  updateProgress,
  getWatchHistory,
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
 * /watch-history:
 *   get:
 *     summary: Get watch history
 *     description: Retrieve the list of movies watched by the authenticated user
 *     tags: [WatchHistory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watch history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: string
 *                   watchedAt:
 *                     type: string
 *                     format: date-time
 *                   progress:
 *                     type: number
 *                     description: Last watched progress in seconds
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getWatchHistory);

export default router;