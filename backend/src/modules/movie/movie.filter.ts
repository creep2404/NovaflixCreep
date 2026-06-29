import { Prisma } from "@prisma/client";
import { QueryMovieInput } from "./dto/query-movie.dto";

const durationMap = {
  short: { lt: 60 * 60 },
  medium: { gte: 60 * 60, lte: 120 * 60 },
  long: { gt: 120 * 60 },
} as const;

type Duration = keyof typeof durationMap;

function buildDurationWhere(duration?: string) {
  if (!duration || !(duration in durationMap)) return undefined;
  return durationMap[duration as Duration];
}

function normalizeGenres(genres?: string | string[]) {
  if (!genres) return [];
  return Array.isArray(genres) ? genres : [genres];
}

export function buildMovieWhere(
  query: QueryMovieInput,
): Prisma.MovieWhereInput {
  const genres = normalizeGenres(query.genres);
  const rating = query.rating ? Number(query.rating) : undefined;
  const durationWhere = buildDurationWhere(query.duration);

  const conditions: Prisma.MovieWhereInput[] = [];

  // only published
  conditions.push({
    isPublished: true,
  });

  // search
  if (query.search) {
    conditions.push({
      title: {
        contains: query.search,
        mode: "insensitive",
      },
    });
  }

  // status
  if (query.status) {
    conditions.push({
      status: query.status,
    });
  }

  // movie/series
  if (query.type) {
    conditions.push({
      type: query.type,
    });
  }

  // genres
  if (genres.length) {
    conditions.push({
      genres: {
        some: {
          genre: {
            id: { in: genres },
          },
        },
      },
    });
  }

  // rating
  if (rating !== undefined) {
    conditions.push({
      detail: {
        rating: {
          gte: rating,
        },
      },
    });
  }

  // duration
  if (durationWhere) {
    conditions.push({
      duration: durationWhere,
    });
  }

  return {
    AND: conditions,
  };
}
