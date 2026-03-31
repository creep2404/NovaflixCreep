export interface UpdateMovieDto {
  title?: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  genres?: string[];
}