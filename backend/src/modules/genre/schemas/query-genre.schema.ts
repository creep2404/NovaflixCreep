import { emptyToUndefined } from "@/common/utils/zod";
import z from "zod";

export const queryGenreSchema = z.object({
  skip: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(0).default(0)
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(1).max(50).default(6)
  ),
  search: z.string().optional(),
});