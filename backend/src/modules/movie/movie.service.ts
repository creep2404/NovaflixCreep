import { CreateMovieDto } from "./dto/create-movie.dto";
import { QueryMovieDto } from "./dto/query-movie.dto";
import { formatMovie } from "./mappers/movie.mapper";
import {
  countMoviesRepo,
  createMovieRepo,
  getAllMoviesRepo,
  getMovieByIdRepo,
  getMoviesRepo,
} from "./movie.repository";

export const createMovieService = async (data: CreateMovieDto) => {
  const movie = await createMovieRepo(data);
  return formatMovie(movie);
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

  const skip = (page - 1) * limit;

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

  return {
    data: movies.map(formatMovie),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
