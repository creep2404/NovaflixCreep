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
import {
  deleteByPattern,
  getCache,
  setCache,
  withCache,
} from "@/common/infra/cache.util";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { eventBus } from "@/events/eventBus";
import { EVENTS } from "@/common/constants/events.constants";
import { getPresignedDownloadUrl } from "@/common/infra/s3-upload.util";
import { FILE_PATHS } from "@/common/constants/file-path.constants";
import { generateSlug } from "@/common/utils/slug";
import { AppError } from "@/common/utils/AppError";
import { getCachedPresignedUrl } from "@/common/utils/presigned-cache.util";

export const createMovieService = async (data: CreateMovieDto) => {
  if (data.duration > 10 * 3600) {
    throw new AppError("Duration too long", 400);
  }

  if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
    throw new AppError("Rating must be between 0 and 5", 400);
  }

  if (!data.description || data.description.length < 10) {
    throw new AppError("Description too short", 400);
  }

  const slug = generateSlug(data.title);
  console.log("CREATE MOVIE DATA:", data);
  const movie = await createMovieRepo({
    ...data,
    slug,
  });

  //Invalidate cache
  await invalidateMovieCache();
  eventBus.emit(EVENTS.MOVIE_CREATED, movie);

  return formatMovie(movie);
};

export const updateMovieService = async (id: string, data: UpdateMovieDto) => {
  if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
    throw new AppError("Invalid rating", 400);
  }

  let updated;

  if (data.title) {
    const slug = generateSlug(data.title);
    updated = await updateMovieRepo(id, { ...data, slug });
  } else {
    updated = await updateMovieRepo(id, data);
  }

  await invalidateMovieCache();

  return formatMovie(updated);
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
  const cacheKey = `movie:${id}`;

  return withCache(cacheKey, async () => {
    const movie = await getMovieByIdRepo(id);

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    const movieWithUrl = {
      ...movie,
      thumbnailUrl: movie.thumbnailUrl
        ? await getPresignedDownloadUrl(movie.thumbnailUrl)
        : null,
    };

    return formatMovie(movieWithUrl);
  });
};
export const getMoviesService = async (query: QueryMovieDto) => {
  const page = query.page || 1;
  const limit = query.limit || 10;

  const genres = Array.isArray(query.genres)
    ? query.genres
    : query.genres
      ? [query.genres]
      : [];

  const rating = query.rating ? Number(query.rating) : undefined;
  const duration = query.duration;

  const cacheKey = await movieCacheKey({
    page,
    limit,
    search: query.search,
    genres: genres.sort().join(","),
    rating,
    duration,
  });

  return withCache(cacheKey, async () => {
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      getMoviesRepo({
        skip,
        take: limit,
        search: query.search,
        genres,
        rating,
        duration,
      }),
      countMoviesRepo({
        genres,
        search: query.search,
        rating,
        duration,
      }),
    ]);

    const moviesWithUrl = await mapWithUrl(movies);

    return {
      items: moviesWithUrl.map(formatMovie),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  });
};

export const getUrlPresignedByMovieId = async (
  movieId: string,
  fileType: keyof typeof FILE_PATHS = "video",
) => {
  const movie = await getMovieByIdRepo(movieId);

  if (!movie) {
    throw new AppError("Movie not found");
  }

  if (!movie.detail) {
    throw new AppError("Movie detail not found");
  }

  const key = FILE_PATHS[fileType](movie.detail.videoId);

  const url = await getPresignedDownloadUrl(key);

  return {
    type: fileType === "thumbnail" ? "image" : "mp4",
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

  const batchSize = 50;
  const moviesWithUrl: typeof movies = [];
  for (let i = 0; i < movies.length; i += batchSize) {
    const batch = movies.slice(i, i + batchSize);
    const batchResult = await Promise.all(
      batch.map(async (movie) => ({
        ...movie,
        thumbnailUrl: movie.thumbnailUrl
          ? await getPresignedDownloadUrl(movie.thumbnailUrl)
          : null,
      })),
    );
    moviesWithUrl.push(...batchResult);
  }
  const result = moviesWithUrl.map(formatMovie);

  await setCache(cacheKey, result, 60);

  return result;
};

export const getContinueWatchingService = async (userId: string) => {
  const histories = await getContinueWatchingRepo(userId);

  return histories
    .filter((item) => item.movie)
    .map((item) => ({
      ...formatMovie(item.movie!),
      progress: item.progress,
    }));
};

const mapWithUrl = async (movies: any[]) => {
  return Promise.all(
    movies.map(async (movie) => {
      if (!movie.thumbnailUrl) return movie;

      return {
        ...movie,
        thumbnailUrl: await getCachedPresignedUrl(movie.thumbnailUrl),
      };
    }),
  );
};
