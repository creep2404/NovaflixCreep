import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  createMovieService,
  getAllMoviesService,
  getContinueWatchingService,
  getMovieByIdService,
  getMoviesService,
  getTrendingMoviesService,
  getVideoPlaybackSource
} from "./movie.service";
import { successResponse } from "@/common/utils/successResponse";
import fs from "fs";
import path from "path";
import {
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
  uploadVideoToS3,
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

    const { videoId } = await uploadVideoToS3(file);

    return successResponse(res, { videoId }, "Video uploaded successfully");
  },
);

//PRESIGNED UPLOAD
export const getUploadUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res.status(400).json({
        success: false,
        message: "Missing filename or contentType",
      });
    }

    // validate file type
    if (!contentType.startsWith("video/")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type",
      });
    }

    const data = await getPresignedUploadUrl(filename, contentType);

    return successResponse(res, data, "Upload URL generated successfully");
  },
);

export const downloadUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { key } = req.query;

    if (!key || typeof key !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid 'key' query parameter",
      });
    }

    // Generate the pre-signed download URL
    const downloadUrl = await getPresignedDownloadUrl(key);

    return successResponse(res, { url: downloadUrl }, "Download URL generated successfully");
  } catch (error) {
    console.error("Error generating download URL:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate download URL",
    });
  }
});

export const getMoviePlayback = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.validated!.params;

    const data = await getVideoPlaybackSource(id);

    return successResponse(res, data, "Get video playback source successfully");
  },
);

export const getTrendingMovies = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getTrendingMoviesService();

    return successResponse(
      res,
      result,
      "Get trending movies successfully",
    );
  },
);

export const getContinueWatching = asyncHandler(
  async (req: any, res: Response) => {
    const userId = req.user.id;

    const result = await getContinueWatchingService(userId);

    return successResponse(
      res,
      result,
      "Get continue watching successfully",
    );
  },
);