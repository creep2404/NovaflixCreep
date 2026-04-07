import { api } from "./axios";

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

export const getMovieById = async (id: string) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

export const getMoviePlaybackData = async (movieId: string) => {
  const res = await api.get(`/movies/${movieId}/play`);
  return res.data;
};
///
export const getTrendingMovies = async () => {
  const res = await api.get('/movies/trending');
  return res.data;
};

export const getMoviesByGenre = async (genre: string) => {
  const res = await api.get('/movies', {
    params: { genre }
  });
  return res.data;
};

export const getContinueWatching = async () => {
  const res = await api.get('/users/me/continue-watching');
  return res.data;
};

