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

  thumbnailUrl: string;
  videoUrl: string;

  duration: number;          
  releaseYear: string | null; 

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
  releaseYear?: string;
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
