import { MovieCard } from "@/src/features/movie/components/MovieCard";
import { SkeletonCard } from "@/src/shared/components/skeleton/Skeleton";

export const MovieGrid = ({
  movies,
  isLoading,
  isFetching,
}: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies?.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {(isLoading || isFetching) &&
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  );
};