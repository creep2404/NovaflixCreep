import z from "zod";

export const suggestMovieSchema = z.object({
  search: z.string().min(1),
});
