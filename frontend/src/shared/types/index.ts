export type ScreenType =
  | "browse"
  | "search"
  | "player"
  | "admin-dashboard"
  | "admin-users"
  | "admin-analytics"
  | "admin-movies";

export interface PaginationQuery {
  page?: number;
  skip?: number;
  limit?: number;
  search?: string;
}
export interface Movie {
  id: string;
  title: string;
  description: string;

  thumbnailUrl: string;
  videoUrl: string;

  duration: number;
  releaseDate: string | null;

  rating: number;
  ratingCount: number;

  genres: {
    genre: {
      name: string;
    };
  }[];

  isPremium?: boolean;
  isOriginal?: boolean;
  quality?: string;
  matchPercentage?: number;
}

export interface EpisodeNew {
  id: string;

  seasonNo: number; //added
  episodeNo: number;

  title: string;
  duration: number;
  description: string;
}

export interface MovieNew {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  releaseDate: string | null;
  rating: number;
  genres: {
    genre: {
      name: string;
    };
  }[];
  type: "MOVIE" | "SERIES";

  seasonCount: number; //added
  episodeCount: number; //added

  episodes: EpisodeNew[];
  continueEpisodeId?: string;
  progress?: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timeAgo: string;
  likes: number;
}

export interface QueryMovie extends PaginationQuery {
  genres?: string[];
  rating?: number | null;
  duration?: string | null;
  //premium?: boolean | null;
}

export interface Genre {
  id: string;
  name: string;
}

export interface QueryGenre extends PaginationQuery {}

export interface CreateMovie {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  duration: number;
  genres?: string[]; // list of genreId
  videoId: string;
  releaseDate?: string;
  rating: number;
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  time: string;
  rating: number;
  text: string;
  likes: number;
  isLiked: boolean;
}

export interface MoviePlayback {
  type: "mp4" | "hls";
  url: string;
}

export interface MoviePlaybackNew {
  playbackUrl: string;

  type: "mp4";

  episode: {
    id: string;
    title: string;
    episodeNo: number;
    duration: number;
  };

  movie: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
}
// export interface CreateMovieDto {
//   title: string;
//   originalTitle?: string;
//   description: string;
//   thumbnailUrl: string;
//   duration: number;
//   videoId: string;
//   genres: string[];
//   releaseDate: string;
//   rating: number;
//   trailerUrl: string;
//   country: string;
//   ageRating: string;
// }

export interface CreateEpisodeDto {
  title: string;
  videoId: string;
  duration: number;
  episodeNo: number;
  description?: string;
}

export interface CreateSeasonDto {
  title: string;
  seasonNo: number;
  episodes: CreateEpisodeDto[];
}

export interface CreateMovieDto {
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  type: "MOVIE" | "SERIES";
  genres: string[];
  releaseDate: string;
  rating: number;
  trailerUrl: string;
  country: string;
  ageRating: string;
  seasons: CreateSeasonDto[];
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: "ADMIN" | "USER" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  isVerified: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  passwordUpdatedAt: string | null;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  failedLoginCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
