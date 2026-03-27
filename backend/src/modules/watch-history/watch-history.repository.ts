import { prisma } from "@/database/client";

export const upsertWatchHistoryRepo = async (data: {
  userId: string;
  movieId: string;
  progress: number;
}) => {
  return prisma.watchHistory.upsert({
    where: {
      userId_movieId: {
        userId: data.userId,
        movieId: data.movieId,
      },
    },
    update: {
      progress: data.progress,
    },
    create: data,
  });
};

export const getWatchHistoryRepo = async (userId: string) => {
  return prisma.watchHistory.findMany({
    where: { userId },
    include: {
      movie: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};