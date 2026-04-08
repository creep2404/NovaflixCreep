import { prisma } from "@/database/client";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

export const createMovieRepo = async (data: CreateMovieDto) => {
  return prisma.movie.create({
    data: {
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      duration: data.duration,
      videoId: data.videoId,
      genres: {
        create: data.genres?.map((name) => ({
          genre: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });
};

export const updateMovieRepo = async (id: string, data: UpdateMovieDto) => {
  const { genres, ...rest } = data;

  return await prisma.movie.update({
    where: { id },
    data: {
      ...rest,

      ...(genres && {
        genres: {
          deleteMany: {}, // delete old genre
          create: genres.map((name) => ({
            genre: {
              connect: { name }, // unique name
            },
          })),
        },
      }),
    },
  });
};

export const deleteMovieRepo = async (id: string) => {
  return await prisma.movie.delete({
    where: { id },
  });
};

export const getAllMoviesRepo = async () => {
  return prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getMovieByIdRepo = async (id: string) => {
  return prisma.movie.findUnique({
    where: { id },
  });
};

export const getMoviesRepo = async ({
  skip,
  take,
  genres,
  search,
  rating,
  duration,
  //premium,
  orderByTrending,
}: {
  skip?: number;
  take?: number;
  genres?: string[];
  search?: string;
  rating?: number;
  duration?: "short" | "medium" | "long";
  //premium?: boolean;
  orderByTrending?: boolean;
}) => {
  return prisma.movie.findMany({
    skip,
    take,

    where: {
      AND: [
        // SEARCH
        search
          ? {
              title: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},

        // GENRES (OR)
        genres && genres.length > 0
          ? {
              genres: {
                some: {
                  genre: {
                    name: {
                      in: genres, 
                    },
                  },
                },
              },
            }
          : {},

        // RATING (>=)
        rating
          ? {
              rating: {
                gte: rating,
              },
            }
          : {},

        // DURATION
        duration === "short"
          ? {
              duration: { lt: 3600 },
            }
          : duration === "medium"
            ? {
                duration: { gte: 3600, lte: 7200 },
              }
            : duration === "long"
              ? {
                  duration: { gt: 7200 },
                }
              : {},

        // PREMIUM (future)
        // premium !== undefined
        //   ? {
        //       isPremium: premium,
        //     }
        //   : {},
      ],
    },

    include: {
      genres: {
        include: {
          genre: true,
        },
      },
    },

    // SORT
    orderBy: orderByTrending
      ? {
          watchHistories: {
            _count: "desc",
          },
        }
      : {
          createdAt: "desc",
        },
  });
};

export const countMoviesRepo = async ({
  skip,
  take,
  genres,
  search,
  rating,
  duration,
  //premium,
}: {
  skip?: number;
  take?: number;
  genres?: string[]; 
  search?: string;
  rating?: number;
  duration?: "short" | "medium" | "long";
  //premium?: boolean;
}) => {
  return prisma.movie.count({
    skip,
    take,
    where: {
      AND: [
        search
          ? {
              title: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},

        genres && genres.length > 0
          ? {
              genres: {
                some: {
                  genre: {
                    name: {
                      in: genres,
                    },
                  },
                },
              },
            }
          : {},

        rating !== undefined
          ? {
              rating: {
                gte: rating,
              },
            }
          : {},

        duration === "short"
          ? { duration: { lt: 3600 } }
          : duration === "medium"
            ? { duration: { gte: 3600, lte: 7200 } }
            : duration === "long"
              ? { duration: { gt: 7200 } }
              : {},
      ],
    },
  });
};

export const getContinueWatchingRepo = async (userId: string) => {
  return prisma.watchHistory.findMany({
    where: {
      userId,
      progress: {
        gt: 0,
        lt: 0.9,
      },
    },
    include: {
      movie: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 10,
  });
};
