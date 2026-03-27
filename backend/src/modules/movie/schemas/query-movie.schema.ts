import { emptyToUndefined } from "@/common/utils/zod";
import { z } from "zod";

export const queryMovieSchema = z.object({
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).default(1)
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).max(50).default(10)
  ),
  genre: z.string().optional(),
  search: z.string().optional(),
});