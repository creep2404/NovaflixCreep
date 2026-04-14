import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1),

  thumbnailUrl: z.string().optional(),
  duration: z.number().int().positive(),

  genres: z.array(z.string()).optional(),

  // MovieDetail
  description: z.string().min(1),
  videoId: z.string().min(1),
  trailerUrl: z.string().optional(),
  releaseDate: z.string().optional(),

  rating: z.number().min(0).max(5).optional(),
});
