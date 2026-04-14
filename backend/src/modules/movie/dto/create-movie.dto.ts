export interface CreateMovieDto {
  title: string;
  slug?: string;

  description?: string;
  thumbnailUrl?: string;
  duration: number;

  genres?: string[]; 

  videoId: string;
  trailer: string;

  releaseDate?: string;

  rating: number; 
}