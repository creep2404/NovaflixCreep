import { useQuery } from "@tanstack/react-query";
import { getMovieBySlug } from "@/src/apis/movie.api";
import { getEpisodePlaybackData } from "@/src/apis/episode.api";

export const usePlayerData = (movieSlug: string, episodeId: string) => {
  const movieQuery = useQuery({
    queryKey: ["movie", movieSlug, episodeId],
    queryFn: () => {
       const res = getMovieBySlug(movieSlug!)
       console.log("Movietest: ", res)
       return res;
    },
    enabled: !!movieSlug,
  });

  const playbackQuery = useQuery({
    queryKey: ["playback", movieSlug, episodeId],
    queryFn: () => getEpisodePlaybackData(episodeId!),
    enabled: !!episodeId,
  });

  return {
    movie: movieQuery.data,
    videoSource: playbackQuery.data,
    isLoading: movieQuery.isLoading || playbackQuery.isLoading,
    error: movieQuery.error || playbackQuery.error,
  };
};
