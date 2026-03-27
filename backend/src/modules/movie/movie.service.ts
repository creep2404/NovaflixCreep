import { CreateMovieDto } from "./dto/create-movie.dto";
import { formatMovie } from "./mappers/movie.mapper";
import {
  createMovieRepo,
  getAllMoviesRepo,
  getMovieByIdRepo,
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
