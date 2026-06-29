import z from "zod";
import { createSeasonSchema } from "./create-season";
import { MovieType } from "@prisma/client";

export const createMovieSchema = z
  .object({
    title: z.string().min(1),
    thumbnailUrl: z.string().optional(),
    duration: z.number().int().positive(),
    type: z.nativeEnum(MovieType),
    genres: z.array(z.string()).optional(),
    // MovieDetail
    description: z.string().min(1),
    trailerUrl: z.string().optional(),
    releaseDate: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    country: z.string().optional(),
    ageRating: z.string().optional(),
    seasons: z.array(createSeasonSchema).min(1),
  })
  .superRefine((data, ctx) => {
    // MOVIE
    if (data.type === "MOVIE") {
      if (data.seasons.length !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: "Movie must have exactly 1 season",

          path: ["seasons"],
        });
      }

      const season = data.seasons[0];

      if (season && season.episodes.length !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: "Movie must have exactly 1 episode",

          path: ["seasons", 0, "episodes"],
        });
      }
    }

    // SERIES

    if (data.type === "SERIES") {
      if (data.seasons.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          message: "Series needs season",

          path: ["seasons"],
        });
      }
    }
  }); 

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
