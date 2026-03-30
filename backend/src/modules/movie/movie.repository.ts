import { prisma } from "@/database/client";
import { CreateMovieDto } from "./dto/create-movie.dto";

export const createMovieRepo = async (data: CreateMovieDto) => {
  return prisma.movie.create({
    data: {
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      duration: data.duration,

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
}: {
  skip: number;
  take: number;
  genre?: string;
  search?: string;
}) => {
  return prisma.movie.findMany({
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
    skip,
    take,
    orderBy: {
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

export const getMovieStreamRepo = async (movieId: string) => {
  return await prisma.movie.findUnique({
    where: { id: movieId },
  });
};