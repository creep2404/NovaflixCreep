import { z } from "zod";
import { createMovieSchema } from "./create-movie.schema";

export const updateMovieSchema = createMovieSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });