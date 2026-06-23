import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/auth.store";
import { getContinueWatching } from "@/src/apis/movie.api";

const QUERY_KEYS = {
  CONTINUE_WATCHING: ["movies", "continueWatching"],
};

export const useContinueWatching = () => {
  const { accessToken } = useAuthStore();

  const continueWatching = useQuery({
    queryKey: QUERY_KEYS.CONTINUE_WATCHING,
    queryFn: getContinueWatching,
    enabled: !!accessToken,
    staleTime: 2 * 60 * 1000,
  });

  return {
    continueWatching
  };
};
