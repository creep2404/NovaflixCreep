export interface CreateMovieDto {
  title: string;
  slug: string;

  description: string;
  thumbnailUrl?: string;
  duration: number;

  genres?: string[]; 

  videoId: string;
  trailerUrl?: string;

  releaseDate?: string;

  rating: number; 
  country?: string;
  ageRating?: string;
}