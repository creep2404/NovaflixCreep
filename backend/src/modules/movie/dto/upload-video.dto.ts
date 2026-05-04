import z from "zod";

export const uploadSchema = z.object({
  videoId: z.string(),
  fileType: z.enum(["video", "thumbnail"]),
});

export type UploadVideoInput = z.infer<typeof uploadSchema>;