import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  createMovieService,
  getAllMoviesService,
  getMovieByIdService,
} from "./movie.service";
import { successResponse } from "@/common/utils/successResponse";

export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);

  return successResponse(res, movie, "Movie created successfully");
});

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
  const movies = await getAllMoviesService();

  return successResponse(res, movies, "Get movies successfully");
});

export const getMovieById = asyncHandler(
  async (req: Request, res: Response) => {
    const movie = await getMovieByIdService(req.params.id);

    return successResponse(res, movie, "Get movie successfully");
  },
);
