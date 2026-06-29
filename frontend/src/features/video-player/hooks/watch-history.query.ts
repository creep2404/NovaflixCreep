import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "@/src/apis/watchHistory.api";

export const WATCH_HISTORY_QUERY_KEY = (
  movieId: string,
) => ["watch-history", movieId];

export const useWatchHistoryQuery = (
  movieId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: WATCH_HISTORY_QUERY_KEY(movieId ?? ""),

    queryFn: () =>
      getWatchHistory(movieId!),

    enabled: !!movieId && enabled,

    staleTime: 1000 * 60 * 5,
  });
};