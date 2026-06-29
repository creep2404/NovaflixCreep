import { Movie, Season } from "@/src/shared/types";
import { buildMovieWatchUrl } from "@/src/shared/utils/movie-routes";
import { Star, Tv, Play, Film, Heart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useFavoriteStatus,
  useToggleFavoriteMutation,
} from "../../user/hooks/useFavorite";

interface HeroSectionDetailProps {
  movie: Movie;
  onWatchTrailer: () => void;
  selectedSeason: Season;
}

export default function HeroSectionDetail({
  movie,
  onWatchTrailer,
  selectedSeason,
}: HeroSectionDetailProps) {
  const navigate = useNavigate();
  const firstEpisode = selectedSeason?.episodes?.[0];
  const canWatch = !!firstEpisode;

  const { data } = useFavoriteStatus(movie.id);
  const isFavorite = data?.isFavorite ?? false;
  const { addFavorite, removeFavorite, isPending } =
    useToggleFavoriteMutation();

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
      } else {
        await addFavorite(movie.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative w-full h-[921px] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          alt={movie?.title}
          className="w-full h-full object-cover scale-105"
          src={movie?.thumbnailUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-8 md:mx-16 mb-20">
        <div className="bg-black/30 p-8 rounded-2xl max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-fixed/20 text-primary-fixed px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase">
              NovaFlix Original
            </span>
            <div className="flex items-center text-primary-fixed">
              <Star size={16} className="fill-current" />
              <span className="text-sm font-bold ml-1">{movie?.rating}/5</span>
            </div>
          </div>

          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-tight">
            {movie?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-on-surface-variant font-medium">
            <span className="flex items-center gap-2">
              <Tv size={18} /> 4K Ultra HD
            </span>
            <span>{movie?.genres?.join(" / ")}</span>
            <span>{movie?.duration}</span>
          </div>

          <p className="text-on-surface text-lg md:text-xl leading-relaxed max-w-2xl mb-10 opacity-90">
            {movie?.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              disabled={!canWatch}
              onClick={() =>
                navigate(
                  buildMovieWatchUrl(
                    movie.slug,
                    firstEpisode.episodeNo,
                    firstEpisode.id,
                  ),
                  { replace: true },
                )
              }
              className="flex items-center gap-2 bg-primary text-surface px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dim transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Play className="fill-current" size={24} />
              Watch Now
            </button>

            <button
              onClick={onWatchTrailer}
              className="bg-surface-variant/40 backdrop-blur-xl border border-white/10 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 
  hover:bg-surface-variant/60 
  hover:scale-105 
  hover:shadow-lg 
  active:scale-95 
  transition-all duration-300 ease-out will-change-transform"
            >
              <Film size={20} />
              Watch Trailer
            </button>

            {/* Favorite button */}
            <button
              onClick={handleToggleFavorite}
              disabled={isPending}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center w-14 h-14 rounded-full border backdrop-blur-xl transition-all duration-300 ease-out
                hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100
                ${
                  isFavorite
                    ? "bg-primary-fixed/20 border-primary-fixed text-primary-fixed"
                    : "bg-surface-variant/40 border-white/10 text-white hover:bg-surface-variant/60"
                }`}
            >
              {isPending ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Heart size={22} className={isFavorite ? "fill-current" : ""} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}