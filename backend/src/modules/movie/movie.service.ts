import { CreateMovieDto } from "./dto/create-movie.dto";
import { QueryMovieDto } from "./dto/query-movie.dto";
import { formatMovie } from "./mappers/movie.mapper";
import {
  countMoviesRepo,
  createMovieRepo,
  deleteMovieRepo,
  getAllMoviesRepo,
  getMovieByIdRepo,
  getMoviesRepo,
  updateMovieRepo,
} from "./movie.repository";
import { invalidateMovieCache, movieCacheKey } from "./movie.cache";
import { deleteByPattern, getCache, setCache } from "@/common/utils/cache.util";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { eventBus } from "@/events/eventBus";
import { EVENTS } from "@/common/constants/events.constants";
import { getPresignedDownloadUrl } from "@/common/utils/s3-upload.util";

export const createMovieService = async (data: CreateMovieDto) => {
  const movie = await createMovieRepo(data);

  //Invalidate cache
  await invalidateMovieCache();
  eventBus.emit(EVENTS.MOVIE_CREATED, movie);

  return formatMovie(movie);
};

export const updateMovieService = async (id: string, data: UpdateMovieDto) => {
  const movie = await updateMovieRepo(id, data);

  await invalidateMovieCache();

  return formatMovie(movie);
};

export const deleteMovieService = async (id: string) => {
  await deleteMovieRepo(id);

  await invalidateMovieCache();

  return { message: "Deleted" };
};

export const getAllMoviesService = async () => {
  return await getAllMoviesRepo();
};

export const getMovieByIdService = async (id: string) => {
  return await getMovieByIdRepo(id);
};

export const getMoviesService = async (query: QueryMovieDto) => {
  const page = query.page || 1;
  const limit = query.limit || 10;

  const cacheKey = await movieCacheKey({
    page,
    limit,
    genre: query.genre,
    search: query.search,
  });

  //CHECK CACHE
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log("CACHE HIT ⚡");
    return cached;
  }

  console.log("CACHE MISS ❌");

  const skip = (page - 1) * limit;

  //QUERY DB
  const [movies, total] = await Promise.all([
    getMoviesRepo({
      skip,
      take: limit,
      genre: query.genre,
      search: query.search,
    }),
    countMoviesRepo({
      genre: query.genre,
      search: query.search,
    }),
  ]);

  const result = {
    data: movies.map(formatMovie),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  //3. SET CACHE
  await setCache(cacheKey, result, 60);

  return result;
};

export const getVideoPlaybackSource = async (movieId: string) => {
  const movie = await getMovieByIdRepo(movieId);

  if (!movie) {
    throw new Error("Movie not found");
  }

  const key = `movies/${movie.videoId}/source.mp4`;

  if (!key) {
    throw new Error("Video not found");
  }

  const url = await getPresignedDownloadUrl(key);

  return {
    type: "mp4" as const,
    url,
  };
};