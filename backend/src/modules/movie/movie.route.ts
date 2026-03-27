import { Router } from "express";
import { createMovie, getMovies, getMovieById } from "./movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import {
  validateRequestBody,
  validateRequestQuery,
} from "@/common/validations/validate";
import { createMovieSchema } from "./schemas/create-movie.schema";
import { queryMovieSchema } from "./schemas/query-movie.schema";

const router = Router();

//Get all movies
//router.get("/", validate(queryMovieSchema), getMovies)
router.get("/", validateRequestQuery(queryMovieSchema), getMovies);
//Get by movie ID
router.get("/:id", getMovieById);

//protected route
router.post(
  "/",
  authMiddleware,
  validateRequestBody(createMovieSchema),
  createMovie,
);

export default router;
