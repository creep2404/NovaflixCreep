import { MovieCard } from "@/src/features/movie/components/MovieCard";

export const MovieRowContent = ({
  movies,
}: {
  movies: any[];
}) => {
  return (
    <>
      {movies?.map((movie) => (
        <div key={movie.id} className="w-[280px] flex-shrink-0 snap-start">
          <MovieCard movie={movie} orientation="landscape" />
        </div>
      ))}
    </>
  );
};