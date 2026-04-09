import { Router } from "express";
import {
  getMovies,
  createMovie,
  getMovieById,
  uploadMovieVideo,
  getUploadUrl,
  getMoviePlayback,
  getTrendingMovies,
} from "./movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from "@/common/validations/validate";
import { createMovieSchema } from "./schemas/create-movie.schema";
import { queryMovieSchema } from "./schemas/query-movie.schema";
import { paramIdSchema } from "./schemas/param-movie.schema";
import { upload } from "@/config/multer";
import { uploadLimiter } from "@/common/middleware/rateLimit.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management APIs
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a paginated list of movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved movie list
 */
router.get("/", validateRequestQuery(queryMovieSchema), getMovies);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Create a new movie (requires authentication)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Avengers
 *               description:
 *                 type: string
 *                 example: Superhero movie
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  validateRequestBody(createMovieSchema),
  createMovie,
);

/**
 * @swagger
 * /movies/upload:
 *   post:
 *     summary: Upload movie video
 *     description: Upload a video file for a movie (requires authentication)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 */
router.post(
  "/upload",
  authMiddleware,
  upload.single("video"),
  uploadMovieVideo,
);

router.get("/trending", getTrendingMovies);

/**
 * @swagger
 * /movies/upload-url:
 *   post:
 *     summary: Generate upload URL
 *     description: Generate a presigned URL for uploading a movie video (requires authentication)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Upload URL generated successfully
 */
router.post("/upload-url", authMiddleware, uploadLimiter, getUploadUrl);

router.get("/:id/play", validateRequestParams(paramIdSchema), getMoviePlayback);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     description: Retrieve details of a specific movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "123"
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully
 *       404:
 *         description: Movie not found
 */
router.get("/:id", validateRequestParams(paramIdSchema), getMovieById);

export default router;
