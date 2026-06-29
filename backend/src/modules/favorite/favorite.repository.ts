import { prisma } from "@/database/client";
import { MovieRepoInput } from "./favorite.type";

export const createFavoriteRepo = async (data: MovieRepoInput) => {
  return prisma.favorite.create({
    data: {
      userId: data.userId,
      movieId: data.movieId,
    },
  });
};

export const deleteFavoriteRepo = async (data: MovieRepoInput) => {
  return prisma.favorite.delete({
    where: {
      userId_movieId: {
        userId: data.userId,
        movieId: data.movieId,
      },
    },
  });
};

export const getFavoriteRepo = async (data: MovieRepoInput) => {
  return prisma.favorite.findUnique({
    where: {
      userId_movieId: {
        userId: data.userId,
        movieId: data.movieId,
      },
    },
  });
};

export const getMyFavoritesRepo = async (userId: string) => {
  return prisma.favorite.findMany({
    where: {
      userId,
    },

    include: {
      movie: {
        include: {
          detail: true,

          genres: {
            include: {
              genre: true,
            },
          },

          seasons: {
            orderBy: {
              seasonNo: "asc",
            },

            include: {
              episodes: {
                orderBy: {
                  episodeNo: "asc",
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      id: "desc",
    },
  });
};
