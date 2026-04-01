import { prisma } from "@/database/client";

export const createNotificationRepo = (data: {
  userId: string;
  type: string;
  content: string;
}) => {
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

