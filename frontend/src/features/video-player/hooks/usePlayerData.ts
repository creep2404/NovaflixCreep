import { useQuery } from "@tanstack/react-query";
import { getMovieById, getMoviePlaybackData } from "@/src/apis/movie.api";
import { getEpisodePlayback } from "@/src/apis/episode.api";

export const usePlayerData = (movieId?: string) => {
  const movieQuery = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
       const res = getMovieById(movieId!)
       console.log("Movietest: ", res)
       return res;
    },
    enabled: !!movieId,
  });

  const playbackQuery = useQuery({
    queryKey: ["playback", movieId],
    queryFn: () => getMoviePlaybackData(movieId!),
    enabled: !!movieId,
  });

  return {
    movie: movieQuery.data,
    videoSource: playbackQuery.data,
    isLoading: movieQuery.isLoading || playbackQuery.isLoading,
    error: movieQuery.error || playbackQuery.error,
  };
};
