export type MovieType = "Movie" | "Series";
export type MovieStatus = "Ongoing" | "Completed" | "Upcoming";
export type MovieMetadataFormState = {
  title: string;
  originalTitle: string;
  description: string;
  director: string;
  genres: string[];
  releaseDate: string;
  rating: number;
  trailerUrl: string;
  status: MovieStatus;
  cast: string[];
  country: string;
  ageRating: string;
  type: MovieType;
};
