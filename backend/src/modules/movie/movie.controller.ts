import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  createMovieService,
  getAllMoviesService,
  getContinueWatchingService,
  getMovieByIdService,
  getMoviesService,
  getTrendingMoviesService,
  getUrlPresignedByMovieId,
} from "./movie.service";
import { successResponse } from "@/common/utils/successResponse";
import fs from "fs";
import path from "path";
import {
  getPresignedUploadUrl,
} from "@/common/utils/s3-upload.util";

export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);

  return successResponse(res, movie, "Movie created successfully");
});

// export const getMovies = asyncHandler(async (req: Request, res: Response) => {
//   const movies = await getAllMoviesService();

//   return successResponse(res, movies, "Get movies successfully");
// });

export const getMovies = asyncHandler(async (req: Request, res: Response) => {
  const result = await getMoviesService(req.validated!.query);
  return successResponse(res, result, "Get movies successfully");
});

export const getMovieById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.validated!.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid 'id' parameter",
      });
    }

    const movie = await getMovieByIdService(id);
    return successResponse(res, movie, "Get movie successfully");
  },
);

export const uploadMovieVideo = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // const { videoId } = await uploadVideoToS3(file);
    const videoId = "123";
    return successResponse(res, { videoId }, "Video uploaded successfully");
  },
);

//PRESIGNED UPLOAD - Main
export const getUploadUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { videoId, fileType } = req.body;

    if (!videoId || !fileType) {
      return res.status(400).json({
        success: false,
        message: "Missing videoId or fileType",
      });
    }

    const data = await getPresignedUploadUrl(videoId, fileType);

    return successResponse(res, data, "Get upload URL successfully");
  },
);

// Get video
// GET /movies/123/playback
// Get thumbnail
// GET /movies/123/playback?type=thumbnail
export const getMoviePlayback = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type } = req.query;

    const fileType = type === "thumbnail" ? "thumbnail" : "video";

    const data = await getUrlPresignedByMovieId(id, fileType);

    return successResponse(res, data, "Get video playback source successfully");
  },
);

export const getTrendingMovies = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getTrendingMoviesService();

    return successResponse(res, result, "Get trending movies successfully");
  },
);

export const getContinueWatching = asyncHandler(
  async (req: any, res: Response) => {
    const userId = req.user.id;

    const result = await getContinueWatchingService(userId);

    return successResponse(res, result, "Get continue watching successfully");
  },
);
