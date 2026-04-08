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
  limit?: number;
  search?: string;
}
export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  rating: string;
  genres: string[];
  thumbnailUrl: string;
  isPremium?: boolean;
  isOriginal?: boolean;
  quality?: string;
  matchPercentage?: number;
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
