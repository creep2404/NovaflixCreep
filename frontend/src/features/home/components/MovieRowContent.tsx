import { MovieCard } from "@/src/features/movie/components/MovieCard";
import { ContinueWatchingMovie, MovieNew } from "@/src/shared/types";

interface MovieRowContentProps {
  movies: MovieNew[] | ContinueWatchingMovie[];
  isContinueWatching?: boolean;
}

export const MovieRowContent = ({
  movies,
  isContinueWatching,
}: MovieRowContentProps) => {
  return (
    <>
      {movies?.map((movie) => {
        const latestSeason = movie.seasons?.at(-1);
        const firstEpisode = latestSeason?.episodes?.[0];

        const playTarget = isContinueWatching
          ? movie.lastWatchedEpisode // TODO
          : firstEpisode;

        return (
          <div key={movie.id} className="w-[280px] flex-shrink-0 snap-start">
            <MovieCard
              movie={movie}
              orientation="landscape"
              playTarget={{
                episodeId: playTarget?.id,
                episodeNo: playTarget?.episodeNo,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
