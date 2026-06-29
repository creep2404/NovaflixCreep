import { MovieType, Prisma } from "@prisma/client";

type CreateEpisodeRepoInput = {
  title: string;
  slug: string;
  videoId: string;
  duration: number;
  episodeNo: number;
  description: string;
  thumbnailUrl?: string;
};

type CreateSeasonRepoInput = {
  title: string;
  seasonNo: number;
  thumbnailUrl?: string;
  description?: string;
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

export type MoviePayload = Prisma.MovieGetPayload<{
  include: {
    detail: true;
    genres: {
      include: {
        genre: true;
      };
    };
    seasons: {
      include: {
        episodes: true;
      };
    };
  };
}>;