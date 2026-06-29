import z from "zod";

export const paramIdSchema = z.object({
  id: z.string().uuid(),
});

export const paramSlugSchema = z.object({
  slug: z.string().min(2).max(100),
});