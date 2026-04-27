import { prisma } from "@/database/client"
import { CreateNotificationInput } from "./dto/create.notification.dto";

export const createNotificationRepo = (
  data: CreateNotificationInput
) => {
  return prisma.notification.create({ data });
};

export const getUserNotificationsRepo = (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const markAsReadRepo = (id: string) => {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};

