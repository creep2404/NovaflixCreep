import { Movie } from "@/src/shared/types";
import { FeaturedFavoriteCard } from "./FavoritesSection/FeaturedFavoriteCard";
import { SectionHeader } from "./HistorySection/SectionHeader";

interface FavoritesSectionProps {
  movies: Movie[];
}

export const FavoritesSection = ({ movies }: FavoritesSectionProps) => {
  if (!movies.length) {
    return null;
  }
  return (
    <div>
      <SectionHeader title="Recently Added" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.slice(0, 4).map((movie) => (
          <FeaturedFavoriteCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};
