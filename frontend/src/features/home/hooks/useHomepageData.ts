import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, getContinueWatching } from "@/src/apis/movie.api";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

const QUERY_KEYS = {
  TRENDING: ["movies", "trending"],
  GENRE: (genre: string) => ["movies", "genre", genre],
  CONTINUE_WATCHING: ["movies", "continueWatching"],
};

export const useHomepageData = () => {
  const { accessToken } = useAuthStore();
  const trending = useQuery({
    queryKey: QUERY_KEYS.TRENDING,
    queryFn: getTrendingMovies,
    staleTime: 5 * 60 * 1000,
  });

  const continueWatching = useQuery({
    queryKey: QUERY_KEYS.CONTINUE_WATCHING,
    queryFn: getContinueWatching,
    enabled: !!accessToken,
    staleTime: 2 * 60 * 1000,
  });

  return {
    trending,
    continueWatching,
    isLoading: trending.isLoading || continueWatching.isLoading,
  };
};
