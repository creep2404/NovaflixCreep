import { Movie, QueryMovie, Review, MoviePlayback, CreateMovieDto } from '../common/types';
import { api } from './axios';

export const getMovies = (params: QueryMovie) =>
  api.get<Movie[]>('/movies', { params });

export const getMovieById = (id: string) =>
  api.get<Movie>(`/movies/${id}`);

export const getMoviePlaybackData = (id: string) =>
  api.get<MoviePlayback>(`/movies/${id}/play`);

export const getTrendingMovies = () =>
  api.get<Movie[]>('/movies/trending');

export const getContinueWatching = () =>
  api.get<Movie[]>('/users/me/continue-watching');

export const createUploadUrl = (payload: {
  videoId: string;
  fileType?: 'thumbnail';
}) =>
  api.post<{ key: string }>('/movies/upload-url', payload);

export const createMovieApi = (payload: CreateMovieDto) =>
  api.post<Movie>('/movies', payload);

export const getSuggestMovies = (search: string) =>
  api.get<Movie[]>('/movies', { params: { search, limit: 5 } });

export const getMovieReviews = (id: string) =>
  api.get<Review[]>(`/movies/${id}/reviews`);