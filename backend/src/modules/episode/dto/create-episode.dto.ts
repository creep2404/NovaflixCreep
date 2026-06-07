import z from "zod";

export const createEpisodeSchema = z.object({
  title: z.string().min(1),
  videoId: z.string().min(1),
  duration: z.number().int().positive(),
  episodeNo: z.number().int().positive(),
  description: z.string().min(1),
});

export type CreateEpisodeInput =
  z.infer<typeof createEpisodeSchema>;