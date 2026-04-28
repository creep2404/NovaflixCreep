import { Prisma } from "@prisma/client";

export type CreateMovieRepoInput = {
  title: string;
  slug: string;
  thumbnailUrl?: string;
  duration: number;

  description: string;
  videoId: string;
  trailerUrl?: string;
  releaseDate?: Date;

  rating?: number;
  country?: string;
  ageRating?: string;

  genres?: string[];
};

export type UpdateMovieRepoInput = {
  title?: string;
  slug?: string;
  thumbnailUrl?: string;
  duration?: number;

  genres?: string[];

  description?: string;
  videoId?: string;
  trailerUrl?: string;
  releaseDate?: Date;
  rating?: number;

  country?: string;
  ageRating?: string;
};

export type GetMoviesRepoInput = {
  skip?: number;
  take?: number;
  where?: Prisma.MovieWhereInput;
  orderByTrending?: boolean;
};