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

export interface PaginationMeta extends PaginationQuery {
  total: number;
  totalPages: number;
}

export interface Episode {
  id: string;

  episodeNo: number;

  thumbnailUrl?: string;
  title: string;
  duration: number;
  durationLabel: string;
  description: string;
}

export interface Season {
  id: string;

  title: string;
  seasonNo: number;

  episodes: Episode[];
}

export interface Movie {
  id: string;

  title: string;
  slug: string;
  description: string;

  thumbnailUrl: string;
  trailerUrl?: string;

  duration: number;
  durationLabel: string;

  releaseDate: string | null;
  rating: number;

  genres: {
    genre: {
      name: string;
    };
  }[];

  type: "MOVIE" | "SERIES";

  seasonCount: number;
  episodeCount: number;

  seasons: Season[];

  continueEpisodeId?: string;
  progress?: number;
}

export interface SearchMovie {
  items: Movie[];
  meta: PaginationMeta;
}

export interface ContinueWatchingMovie extends Movie {
  episode?: {
    id: string;
    title: string;
    episodeNo: number;
  };

  progress?: number;
  progressPercent?: number;
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
