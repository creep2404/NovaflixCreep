export interface UpdateMovieDto {
  title?: string;
  slug?: string;
  thumbnailUrl?: string;
  duration?: number;

  genres?: string[];

  description?: string;
  videoId?: string;
  trailerUrl?: string;
  releaseDate?: string;
  rating?: number;
}