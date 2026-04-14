import { QueryMovie } from "../types";
import { api } from "./axios";

export const getMovies = async (params: QueryMovie) => {
  const res = await api.get("/movies", { params });
  return res.data?.data;
};

export const getMovieById = async (id: string) => {
  const res = await api.get(`/movies/${id}`);
  return res.data?.data;
};

export const getMoviePlaybackData = async (id: string) => {
  const res = await api.get(`/movies/${id}/play`);
  return res.data;
};
///
export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending");
  return res.data;
};

export const getMoviesByGenre = async (genre: string) => {
  const res = await api.get("/movies", {
    params: { genre },
  });
  return res.data;
};

export const getContinueWatching = async () => {
  const res = await api.get("/users/me/continue-watching");
  return res.data;
};

export const createUploadUrl = async (payload: {
  videoId: string;
  fileType?: 'thumbnail';
}) => {
  const res = await api.post("/movies/upload-url", payload);
  return res.data.data; 
};

export const createMovieApi = async (payload: {
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  videoId: string;
  genres: string[];
  releaseYear: string;
  rating: string;
}) => {
  const res = await api.post("/movies", payload);
  return res.data.data;
};

export const getSuggestMovies = async (search: string) => {
  const res = await api.get("/movies", {
    params: { search, limit: 5 },
  });
  return res.data;
};

export const getMovieReviews = async (id: string) => {
  const res = await api.get(`/movies/${id}/reviews`);
  return res.data;
};
