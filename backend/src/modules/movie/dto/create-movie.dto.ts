export interface CreateMovieDto {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  genres?: string[]; // list of genreId
  videoId: string;
  releaseYear?: string;
  rating: number;
}