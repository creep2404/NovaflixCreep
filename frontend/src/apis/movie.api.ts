import {
  QueryMovie,
  Review,
  CreateMovieDto,
  MovieNew,
} from "@/src/shared/types";
import { api } from "./axios";
import { UploadUrlResponse } from "../features/admin/movie/types/upload";

export const getMovies = (params: QueryMovie) => {
  const res = api.get<MovieNew[]>("/movies", { params });
  console.log("MovieAPI: ", res);
  return res;
};

export const getMovieById = (id: string) => {
  const res = api.get<MovieNew>(`/movies/${id}`);
  console.log("MovieById: ", res);
  return res;
};

export const getMovieBySlug = (slug: string) =>
  api.get<MovieNew>(`/movies/slug/${slug}`);

export const getTrendingMovies = () => {
  const res = api.get<MovieNew[]>("/movies/trending");
  console.log("TrendingMovies: ", res);
  return res;
};

export const getContinueWatching = () =>
  api.get<MovieNew[]>("/users/me/continue-watching");

export const createUploadUrl = (payload: {
  videoId: string;
  fileType: "video" | "thumbnail";
}) => {
  return api.post<UploadUrlResponse>("/movies/upload-url", payload);
};

export const createMovieApi = (payload: CreateMovieDto) => {
  console.log("Creating movie with payload:", payload);
  return api.post("/movies", payload);
};

export const getSuggestMovies = (search: string) =>
  api.get<MovieNew[]>("/movies/suggest", {
    params: { search },
  });

export const getMovieReviews = (id: string) =>
  api.get<Review[]>(`/movies/${id}/reviews`);
