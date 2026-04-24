import z from "zod";

export const uploadSchema = z.object({
  videoId: z.string(),
  fileType: z.enum(["video", "thumbnail"]),
});