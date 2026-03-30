import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import {
  createMovieService,
  getAllMoviesService,
  getMovieByIdService,
  getMoviesService,
  getMovieStreamService,
} from "./movie.service";
import { successResponse } from "@/common/utils/successResponse";
import fs from "fs";
import path from "path";
import {
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

export const streamMovie = async (req: Request, res: Response) => {
  const range = req.headers.range || "bytes=0-";
  //const range = req.headers.range;
  // if (!range) {
  //   return res.status(400).send("Requires Range header");
  // }

  //const videoPath = path.join(process.cwd(), "src/samples/stream-sample.mp4");
  const videoPath = path.join(process.cwd(), "src/samples/aemthsing.mp4");
  console.log("VIDEO PATH:", videoPath);
  console.log("EXISTS:", fs.existsSync(videoPath));
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });

  stream.pipe(res);
};

export const getMovieStream = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getMovieStreamService(req.params.id);
    // const { id } = req.validated!.params;

    // const data = await getMovieStreamService(id);
    res.json({
      success: true,
      data,
    });
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

    const key = await uploadVideoToS3(file);

    res.json({
      success: true,
      data: {
        videoKey: key,
      },
    });
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

    res.json({
      success: true,
      data,
    });
  },
);
