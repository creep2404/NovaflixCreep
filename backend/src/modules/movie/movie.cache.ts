import { redis } from "../../config/redis";

const MOVIE_CACHE_VERSION_KEY = "movies:version";

// get current version
export const getMovieCacheVersion = async () => {
  const version = await redis.get(MOVIE_CACHE_VERSION_KEY);
  return version || "1";
};

// increment version (invalidate cache)
export const invalidateMovieCache = async () => {
  await redis.incr(MOVIE_CACHE_VERSION_KEY);
};

// create cache key
export const movieCacheKey = async (params: {
  page: number;
  limit: number;
  genre?: string;
  search?: string;
}) => {
  const version = await getMovieCacheVersion();

  return `movies:v${version}:${params.page}:${params.limit}:${params.genre || ""}:${params.search || ""}`;
};
//ex: movies:v1:1:10:action:batman