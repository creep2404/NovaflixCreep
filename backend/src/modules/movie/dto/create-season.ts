import { createEpisodeSchema } from "@/modules/episode/dto/create-episode.dto";
import z from "zod";

export const createSeasonSchema = z.object({
  title: z.string().min(1),
  seasonNo: z.number().int().positive(),
  episodes: z.array(createEpisodeSchema).min(1),
});
