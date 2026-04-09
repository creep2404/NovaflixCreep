import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  duration: z.number().int().positive(),
  genres: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional()
});