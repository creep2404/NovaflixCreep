import { prisma } from "@/database/client";
import { buildPrismaUpdate } from "@/common/utils/object.util";
import { CreateMovieRepoInput, GetMoviesRepoInput, UpdateMovieRepoInput } from "./movie.type";

export const createMovieRepo = async (data: CreateMovieRepoInput) => {
  const movie = await prisma.movie.create({
    data: {
      title: data.title,
      slug: data.slug,
      thumbnailUrl: data.thumbnailUrl,
      duration: data.duration,

      detail: {
        create: {
          description: data.description,
          videoId: data.videoId,
          trailerUrl: data.trailerUrl,
          releaseDate: data.releaseDate
            ? new Date(data.releaseDate)
            : undefined,
          rating: data.rating,
          country: data.country,
          ageRating: data.ageRating,
        },
      },
    },
  });

  if (data.genres?.length) {
    await prisma.movieGenre.createMany({
      data: data.genres.map((genreId) => ({
        movieId: movie.id,
        genreId,
      })),
      skipDuplicates: true,
    });
  }

  return prisma.movie.findUnique({
    where: { id: movie.id },
    include: {
      genres: { include: { genre: true } },
      detail: true,
    },
  });
};

export const updateMovieRepo = async (
  id: string,
  data: UpdateMovieRepoInput,
) => {
  const {
    genres,
    description,
    videoId,
    trailerUrl,
    releaseDate,
    rating,
    // country,
    // ageRating,
    ...movieData
  } = data;

  return await prisma.movie.update({
    where: { id },
    data: {
      ...movieData,

      detail: {
        update: buildPrismaUpdate({
          description,
          videoId,
          trailerUrl,
          releaseDate,
          rating,
          // country,
          // ageRating,
        }),
      },

      ...(genres && {
        genres: {
          deleteMany: {},
          create: genres.map((genreId) => ({
            genre: {
              connect: { id: genreId },
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
    include: {
      detail: true,
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });
};

export const getMoviesRepo = async ({
  skip,
  take,
  where,
  orderByTrending,
}: GetMoviesRepoInput) => {
  return prisma.movie.findMany({
    skip,
    take,

    where,

    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      detail: true,
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

export const countMoviesRepo= async ({
  where
}: GetMoviesRepoInput) => {
  return prisma.movie.count({
    where
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
