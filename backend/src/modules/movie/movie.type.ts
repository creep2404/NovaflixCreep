import { MovieType } from "@/common/enums";
import { Prisma } from "@prisma/client";


type CreateEpisodeRepoInput = {
  title: string;
  slug: string;
  videoId: string;
  duration: number;
  episodeNo: number;
  description: string;
};

type CreateSeasonRepoInput = {
  title: string;
  seasonNo: number;
  episodes: CreateEpisodeRepoInput[];
};

export type CreateMovieRepoInput = {
  title: string;
  slug: string;
  thumbnailUrl?: string;
  duration: number;
  type: MovieType;

  // MovieDetail
  description: string;
  trailerUrl?: string;
  releaseDate?: Date;
  rating?: number;
  country?: string;
  ageRating?: string;
  genres?: string[];
  seasons: CreateSeasonRepoInput[];
};

export type UpdateMovieRepoInput = {
  title?: string;
  slug?: string;
  thumbnailUrl?: string;
  duration?: number;

  type: MovieType;

  // MovieDetail
  description: string;
  trailerUrl?: string;
  releaseDate?: Date;
  rating?: number;
  country?: string;
  ageRating?: string;
  genres?: string[];
  seasons: CreateSeasonRepoInput[];
};

export type GetMoviesRepoInput = {
  skip?: number;
  take?: number;
  where?: Prisma.MovieWhereInput;
  orderByTrending?: boolean;
};
