import { prisma } from "@/database/client";
import { buildPrismaUpdate } from "@/common/utils/object.util";
import {
  CreateMovieRepoInput,
  GetMoviesRepoInput,
  UpdateMovieRepoInput,
} from "./movie.type";

export const createMovieRepo = async (data: CreateMovieRepoInput) => {
  const movie = await prisma.movie.create({
    data: {
      title: data.title,
      slug: data.slug,
      thumbnailUrl: data.thumbnailUrl,
      duration: data.duration,
      type: data.type,

      detail: {
        create: {
          description: data.description,
          
          videoId: data.seasons[0]?.episodes[0]?.videoId || "",

          trailerUrl: data.trailerUrl,
          releaseDate: data.releaseDate,
          rating: data.rating,
          country: data.country,
          ageRating: data.ageRating,
        },
      },

      seasons: {
        create: data.seasons.map((season) => ({
          title: season.title,
          seasonNo: season.seasonNo,

          episodes: {
            create: season.episodes.map((ep) => ({
              title: ep.title,
              videoId: ep.videoId,
              duration: ep.duration,
              episodeNo: ep.episodeNo,
              description: ep.description,
            })),
          },
        })),
      },
    },

    include: {
      detail: true,

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

      genres: {
        include: {
          genre: true,
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
    where: {
      id: movie.id,
    },

    include: {
      detail: true,

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

      genres: {
        include: {
          genre: true,
        },
      },
    },
  });
};

// export const updateMovieRepo = async (
//   id: string,
//   data: UpdateMovieRepoInput,
// ) => {
//   const {
//     genres,
//     description,
//     videoId,
//     trailerUrl,
//     releaseDate,
//     rating,
//     // country,
//     // ageRating,
//     ...movieData
//   } = data;

//   return await prisma.movie.update({
//     where: { id },
//     data: {
//       ...movieData,

//       detail: {
//         update: buildPrismaUpdate({
//           description,
//           videoId,
//           trailerUrl,
//           releaseDate,
//           rating,
//           // country,
//           // ageRating,
//         }),
//       },

//       ...(genres && {
//         genres: {
//           deleteMany: {},
//           create: genres.map((genreId) => ({
//             genre: {
//               connect: { id: genreId },
//             },
//           })),
//         },
//       }),
//     },
//   });
// };

export const updateMovieRepo = async (
  id: string,
  data: UpdateMovieRepoInput,
) => {
  const {
    genres,
    description,
    trailerUrl,
    releaseDate,
    rating,
    country,
    ageRating,
    ...movieData
  } = data;

  return prisma.movie.update({
    where: {
      id,
    },

    data: {
      ...movieData,

      detail: {
        update: buildPrismaUpdate({
          description,
          trailerUrl,
          releaseDate,
          rating,
          country,
          ageRating,
        }),
      },
      ...(genres && {
        genres: {
          deleteMany: {},

          create: genres.map((genreId) => ({
            genre: {
              connect: {
                id: genreId,
              },
            },
          })),
        },
      }),
    },

    include: {
      detail: true,
      genres: {
        include: {
          genre: true,
        },
      },
      episodes: {
        orderBy: {
          episodeNo: "asc",
        },
      },
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

      seasons: {
        orderBy: {
          seasonNo: "asc",
        },

        include: {
          episodes: {
            orderBy: {
              episodeNo: "asc",
            },

            select: {
              id: true,
              title: true,
              episodeNo: true,
              duration: true,
              description: true,
            },
          },
        },
      },
    },
  });
};

// export const getMoviesRepo = async ({
//   skip,
//   take,
//   where,
//   orderByTrending,
// }: GetMoviesRepoInput) => {
//   return prisma.movie.findMany({
//     skip,
//     take,
//     where,
//     include: {
//       detail: true,
//       genres: {
//         include: {
//           genre: true,
//         },
//       },
//       episodes: {
//         select: {
//           id: true,
//           episodeNo: true,
//           title: true,
//           duration: true,
//           description: true,
//         },
//       },
//       _count: {
//         select: {
//           episodes: true,
//         },
//       },
//     },

//     orderBy: orderByTrending
//       ? {
//           watchHistories: {
//             _count: "desc",
//           },
//         }
//       : {
//           updatedAt: "desc",
//         },
//   });
// };

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
      detail: true,

      genres: {
        include: {
          genre: true,
        },
      },

      seasons: {
        // Get only latest season with 1 episode to optimize for trending page
        take: 1,

        orderBy: {
          seasonNo: "desc",
        },
        select: {
          id: true,
          seasonNo: true,

          _count: {
            select: {
              episodes: true,
            },
          },

          episodes: {
            take: 1,

            orderBy: {
              episodeNo: "asc",
            },

            select: {
              id: true,
              title: true,
              episodeNo: true,
            },
          },
        },
      },

      _count: {
        select: {
          watchHistories: true,
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
          updatedAt: "desc",
        },
  });
};

export const countMoviesRepo = async ({ where }: GetMoviesRepoInput) => {
  return prisma.movie.count({
    where,
  });
};

// export const getContinueWatchingRepo = async (userId: string) => {
//   return prisma.watchHistory.findMany({
//     where: {
//       userId,
//       progress: {
//         gt: 0,
//       },
//     },
//     include: {
//       movie: {
//         include: {
//           detail: true,
//         },
//       },
//       episode: true,
//     },
//     orderBy: {
//       updatedAt: "desc",
//     },
//     take: 10,
//   });
// };

export const getContinueWatchingRepoClone = async (userId: string) => {
  return prisma.watchHistory.findMany({
    where: {
      userId,
      progress: {
        gt: 0,
      },
    },

    include: {
      episode: {
        include: {
          season: {
            include: {
              movie: {
                include: {
                  detail: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },

    take: 10,
  });
};

export const getContinueWatchingRep8o = async (
  userId: string
) => {
  return prisma.watchHistory.findMany({
    where: {
      userId,

      progress: {
        gt: 0,
      },
    },

    distinct: ["movieId"],

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
            take: 1,

            orderBy: {
              seasonNo: "desc",
            },

            select: {
              id: true,
              seasonNo: true,

              episodes: {
                take: 1,

                orderBy: {
                  episodeNo: "desc",
                },

                select: {
                  id: true,
                  title: true,
                  episodeNo: true,
                },
              },
            },
          },
        },
      },

      episode: {
        select: {
          id: true,
          title: true,
          episodeNo: true,
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },

    take: 10,
  });
};
