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
  genre,
  search,
  orderByTrending,
}: {
  skip?: number;
  take?: number;
  genre?: string;
  search?: string;
  orderByTrending?: boolean;
}) => {
  return prisma.movie.findMany({
    skip,
    take,
    where: {
      title: search
        ? {
            contains: search,
            mode: "insensitive",
          }
        : undefined,

      genres: genre
        ? {
            some: {
              genre: {
                name: genre,
              },
            },
          }
        : undefined,
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
    },

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
  genre,
  search,
}: {
  genre?: string;
  search?: string;
}) => {
  return prisma.movie.count({
    where: {
      title: search
        ? {
            contains: search,
            mode: "insensitive",
          }
        : undefined,

      genres: genre
        ? {
            some: {
              genre: {
                name: genre,
              },
            },
          }
        : undefined,
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
