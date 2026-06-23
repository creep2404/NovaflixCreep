import z from "zod";

export const favoriteParamSchema = z.object({
  movieId: z.string().uuid(),
});

export type FavoriteParamInput = z.infer<typeof favoriteParamSchema>;
