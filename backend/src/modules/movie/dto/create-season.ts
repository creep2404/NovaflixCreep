import z from "zod";
import { createEpisodeSchema } from "./create-episode";

export const createSeasonSchema = z.object({
  title: z.string().min(1),
  seasonNo: z.number().int().positive(),
  episodes: z.array(createEpisodeSchema).min(1),
});
