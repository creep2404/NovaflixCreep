import { Router } from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  streamMovie,
  getMovieStream,
  uploadMovieVideo,
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

const router = Router();

//Get all movies
//router.get("/", validate(queryMovieSchema), getMovies)
router.get("/", validateRequestQuery(queryMovieSchema), getMovies);
//Get by movie ID
router.get("/:id", validateRequestParams(paramIdSchema), getMovieById);

//protected route
router.post(
  "/",
  authMiddleware,
  validateRequestBody(createMovieSchema),
  createMovie,
);

router.get("/:id/stream", authMiddleware, getMovieStream);

router.post(
  "/upload",
  authMiddleware,
  upload.single("video"),
  uploadMovieVideo,
);

export default router;
