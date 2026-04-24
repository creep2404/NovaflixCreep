import z from "zod";

export const suggestMovieSchema = z.object({
  search: z.string().min(1),
});

export type SuggestMovieInput = z.infer<typeof suggestMovieSchema>;