import { Movie } from "@/src/shared/types";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggleFavoriteMutation } from "../../hooks/useFavorite";
import { useState } from "react";

interface FeaturedFavoriteCardProps {
  movie: Movie;
}

export const FeaturedFavoriteCard = ({ movie }: FeaturedFavoriteCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(true);

  const { addFavorite, removeFavorite, isPending } =
    useToggleFavoriteMutation();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
      } else {
        await addFavorite(movie.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="col-span-2 relative group overflow-hidden rounded-xl bg-surface-container aspect-[16/10] cursor-pointer"
      onClick={() => navigate(`/movie/${movie.slug}`)}
    >
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          !isFavorite ? "opacity-50" : ""
        }`}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite(e);
        }}
        disabled={isPending}
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm"
      >
        <Heart
          size={24}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>
      {!isFavorite && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="px-3 py-1 rounded-full bg-black/70 text-xs font-medium">
            Removed from favorites
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">
          <span className="text-xs text-on-surface-variant/70">
            {movie.genres.join(", ")}
          </span>
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white leading-none">
          {movie.title}
        </h3>
        <div className="absolute top-4 right-4">
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
            ⭐ {movie.rating}
          </div>
        </div>
      </div>
    </div>
  );
};
