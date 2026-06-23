import { MovieCard } from "@/src/features/movie/components/MovieCard";
import { SkeletonCard } from "@/src/shared/components/skeleton/Skeleton";
import { Movie } from "@/src/shared/types";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  isFetching: boolean;
}

export const MovieGrid = ({
  movies,
  isLoading,
  isFetching,
}: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies?.map((movie: Movie) => {
        const latestSeason = movie.seasons?.at(-1);
        const firstEpisode = latestSeason?.episodes?.[0];

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            playTarget={{
              episodeId: firstEpisode?.id,
              episodeNo: firstEpisode?.episodeNo,
            }}
          />
        );
      })}

      {(isLoading || isFetching) &&
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  );
};