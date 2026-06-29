import z from "zod";

export const updateEpisodeSchema =
  z.object({
    title: z.string().min(1).optional(),
    videoId: z.string().min(1).optional(),
    duration: z.number().int().positive().optional(),
    episodeNo: z.number().int().positive().optional(),
    description: z.string().min(1).optional(),
  });

export type UpdateEpisodeInput =
  z.infer<typeof updateEpisodeSchema>;