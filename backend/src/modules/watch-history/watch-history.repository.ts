import { prisma } from "@/database/client";

export const upsertWatchHistoryRepo = async (data: {
  userId: string;
  movieId: string;
  episodeId: string;
  progress: number;
}) => {
  return prisma.watchHistory.upsert({
    where: {
      userId_episodeId: {
        userId: data.userId,
        episodeId: data.episodeId,
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
  movieId: string,
) => {
  return prisma.watchHistory.findFirst({
    where: {
      userId,
      movieId,
    },

    include: {
      episode: true,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
};
