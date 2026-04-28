import z from "zod";

const emptyToUndefined = (val: any) =>
  val === "" ? undefined : val;

export const queryMovieSchema = z.object({
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).default(1)
  ),

  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).max(50).default(10)
  ),

  search: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  // genres: string | string[] → string[]
  genres: z
    .preprocess((val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    }, z.array(z.string()))
    .optional(),

  // rating: string → number
  rating: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(0).max(5).optional()
  ),

  // duration enum
  duration: z
    .preprocess(emptyToUndefined,
      z.enum(["short", "medium", "long"]).optional()
    ),

  // premium: string → boolean
  premium: z.preprocess(
    emptyToUndefined,
    z.coerce.boolean().optional()
  ),
});

export type QueryMovieInput = z.infer<typeof queryMovieSchema>;