import { z } from "zod";

export const updateProgressSchema = z.object({
  movieId: z.string().uuid(),
  progress: z.number().int().min(0),
});