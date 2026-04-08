import { CreateMovieDto } from "./dto/create-movie.dto";
import { QueryMovieDto } from "./dto/query-movie.dto";
import { formatMovie } from "./mappers/movie.mapper";
import {
  countMoviesRepo,
  createMovieRepo,
  deleteMovieRepo,
  getAllMoviesRepo,
  getContinueWatchingRepo,
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

  // ===============================
  // NORMALIZE INPUT
  // ===============================
  const genres = Array.isArray(query.genres)
    ? query.genres
    : query.genres
      ? [query.genres]
      : [];
  const rating = query.rating ? Number(query.rating) : undefined;
  const duration = query.duration;
  //const premium =

  const cacheKey = await movieCacheKey({
    page,
    limit,
    search: query.search,
    genres: genres.join(","), 
    rating,
    duration,
    //premium,
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
      search: query.search,
      genres,
      rating,
      duration,
      //premium,
    }),
    countMoviesRepo({
      genres,
      search: query.search,
      rating,
      duration,
      //premium,
    }),
  ]);
  console.log("Fetched movies from DB:", total, movies.length, movies);

  const result = {
    data: movies.map(formatMovie),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
  console.log("Fetched movies from DB:", movies);

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

export const getTrendingMoviesService = async () => {
  const cacheKey = "movies:trending";

  const cached = await getCache(cacheKey);
  if (cached) {
    console.log("CACHE HIT ⚡");
    return cached;
  }

  console.log("CACHE MISS ❌");

  const movies = await getMoviesRepo({
    take: 10,
    orderByTrending: true,
  });

  console.log("Fetched movies from DB:", movies);

  const result = movies.map(formatMovie);

  await setCache(cacheKey, result, 60);

  return result;
};

export const getContinueWatchingService = async (userId: string) => {
  // NO CACHE (user-specific data)
  const histories = await getContinueWatchingRepo(userId);

  const result = {
    data: histories.map((item) => ({
      ...formatMovie(item.movie),
      progress: item.progress,
    })),
  };

  return result;
};
