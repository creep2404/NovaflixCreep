import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  createMovieService,
  getContinueWatchingService,
  getMovieByIdService,
  getMoviesService,
  getSuggestMoviesService,
  getTrendingMoviesService,
  getUrlPresignedByMovieId,
} from "./movie.service";
import { successResponse } from "@/common/utils/successResponse";
import { getPresignedUploadUrl } from "@/common/infra/s3-upload.util";
import { CreateMovieInput } from "./dto/create-movie.dto";
import { QueryMovieInput } from "./dto/query-movie.dto";
import { typedHandler } from "@/common/utils/typedRoute";
import { UploadVideoInput } from "./dto/upload-video.dto";

export const createMovie = asyncHandler(
  typedHandler<CreateMovieInput>(async (req, res) => {
    const movie = await createMovieService(req.validated.body);

    return successResponse(res, movie, "Movie created successfully");
  }),
);

// export const getMovies = asyncHandler(async (req: Request, res: Response) => {
//   const movies = await getAllMoviesService();

//   return successResponse(res, movies, "Get movies successfully");
// });

export const getMovies = asyncHandler(
  typedHandler<unknown, QueryMovieInput>(async (req, res) => {
    const query = req.validated?.query;
    const result = await getMoviesService(query);
    return successResponse(res, result, "Get movies successfully");
  }),
);

export const getMovieById = asyncHandler(
  typedHandler<unknown, unknown, { id: string }>(async (req, res) => {
    const { id } = req.validated.params;

    const movie = await getMovieByIdService(id);

    return successResponse(res, movie, "Get movie successfully");
  }),
);

// export const uploadMovieVideo = asyncHandler(
//   async (req: Request, res: Response) => {
//     const file = req.file;

//     if (!file) {
//       throw new AppError("No file uploaded");
//     }

//     // const { videoId } = await uploadVideoToS3(file);
//     const videoId = "test-video-id";
//     return successResponse(res, { videoId }, "Video uploaded successfully");
//   },
// );

//PRESIGNED UPLOAD - Main
export const getUploadUrl = asyncHandler(
  typedHandler<UploadVideoInput>(async (req, res) => {
    const { videoId, fileType } = req.validated.body;

    const data = await getPresignedUploadUrl(videoId, fileType);
    console.log("Presigned URL data:", data);
    return successResponse(res, data, "Get upload URL successfully");
  }),
);

// Get video
// GET /movies/123/playback
// Get thumbnail
// GET /movies/123/playback?type=thumbnail
export const getMoviePlayback = asyncHandler(
  typedHandler<unknown, unknown , { id: string }>(async (req, res) => {
    const { id } = req.validated.params;
    const fileType = "video";

    const data = await getUrlPresignedByMovieId(id, fileType);

    return successResponse(res, data);
  }),
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

export const getSuggestMovies = asyncHandler(
  typedHandler<unknown, { search: string }>(async (req, res) => {
    const { search } = req.validated.query;

    const result = await getSuggestMoviesService(search);

    return successResponse(res, result, "Get suggest movies successfully");
  }),
);