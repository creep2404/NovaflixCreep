import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().optional(),
  duration: z.number().int().positive(),
  genres: z.array(z.string()).optional(),
});