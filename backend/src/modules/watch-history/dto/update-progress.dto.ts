import z from "zod";

export const updateProgressSchema = z.object({
  movieId: z.string(),

  episodeId: z.string(),

  progress: z.number().int().min(0),
});

export type UpdateProgressDto =
  z.infer<typeof updateProgressSchema>;