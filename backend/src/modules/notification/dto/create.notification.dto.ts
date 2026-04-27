import { NotificationType } from "@/common/enums";
import z from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().min(1),

  type: z.nativeEnum(NotificationType),

  content: z.string().min(1),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
