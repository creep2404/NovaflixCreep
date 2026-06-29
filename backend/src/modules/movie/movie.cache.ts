import { redis } from "../../config/redis";

const MOVIE_CACHE_VERSION_KEY = "movies:version";

// get current version
export const getMovieCacheVersion = async () => {
  const version = await redis.get(MOVIE_CACHE_VERSION_KEY);
  return version ?? "1";
};

// increment version (invalidate cache)
export const invalidateMovieCache = async () => {
  await redis.incr(MOVIE_CACHE_VERSION_KEY);
};

// create cache key
export const movieCacheKey = async (params: {
  page: number;
  limit: number;
  search?: string;
  genres?: string;
  rating?: number;
  duration?: "short" | "medium" | "long";
  status?: "COMING_SOON" | "RELEASED" | "ARCHIVED";
  type?: "MOVIE" | "SERIES";
}) => {
  const version = await getMovieCacheVersion();

  return [
    `movies:v${version}`,
    `page:${params.page}`,
    `limit:${params.limit}`,
    `search:${params.search ?? ""}`,
    `genres:${params.genres ?? ""}`,
    `rating:${params.rating ?? ""}`,
    `duration:${params.duration ?? ""}`,
    `status:${params.status ?? ""}`,
    `type:${params.type ?? ""}`,
  ].join(":");
};
// ex: movies:v1:page:1:limit:10:search::genres:action,comedy:rating:4:duration:medium:status:RELEASED:type:MOVIE
