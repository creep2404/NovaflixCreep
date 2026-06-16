import React from "react";
import { Play, Plus } from "lucide-react";
import { ContinueWatchingMovie, MovieNew } from "@/src/shared/types";
import { useNavigate } from "react-router-dom";
import { buildMovieWatchUrl } from "@/src/shared/utils/movie-routes";

interface MovieCardProps {
  movie: MovieNew | ContinueWatchingMovie;
  orientation?: "portrait" | "landscape";
  playTarget: {
    episodeId: string;
    episodeNo: number;
  };
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  orientation = "portrait",
  playTarget,
}) => {
  const isLandscape = orientation === "landscape";
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => navigate(`/movie/${movie.id}`)}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-primary/20 ${isLandscape ? "aspect-video" : "aspect-[2/3]"}`}
    >
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-highest via-surface-highest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {movie.isOriginal && (
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-surface rounded-md">
            Original
          </span>
        )}
        {movie.isPremium && (
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-500 text-black rounded-md">
            Premium
          </span>
        )}
      </div>

      {/* Hover Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="font-headline font-semibold text-lg line-clamp-1 mb-1">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
          {movie.matchPercentage && (
            <span className="text-green-400 font-medium">
              {movie.matchPercentage}% Match
            </span>
          )}
          <span>{movie.year}</span>
          <span className="px-1.5 py-0.5 border border-white/20 rounded text-[10px]">
            {movie.rating}
          </span>
          <span>{movie.duration}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(
                buildMovieWatchUrl(
                  movie.slug,
                  playTarget.episodeNo,
                  playTarget.episodeId,
                ),
                { replace: true },
              )
            }
            className="flex-1 flex items-center justify-center gap-1 bg-white text-black py-1.5 rounded-md font-medium text-sm hover:bg-white/90 transition-colors"
          >
            <Play size={14} className="fill-current" /> Play
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              //add to favorite
            }}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-md backdrop-blur-sm transition-colors text-white"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
