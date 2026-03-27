import { Router } from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
} from "./movie.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";
import { validate } from "@/common/validations/validate";
import { createMovieSchema } from "./schemas/create-movie.schema";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

//protected route
router.post("/", authMiddleware, validate(createMovieSchema),createMovie);

export default router;