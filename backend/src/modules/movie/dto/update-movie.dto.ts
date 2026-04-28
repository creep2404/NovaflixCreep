import z from "zod";
import { createMovieSchema } from "./create-movie.dto";

export const updateMovieSchema = createMovieSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
