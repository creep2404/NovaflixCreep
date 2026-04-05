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

export const getWatchHistoryByMovieRepo = async (
  userId: string,
  movieId: string
) => {
  return prisma.watchHistory.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
  });
};