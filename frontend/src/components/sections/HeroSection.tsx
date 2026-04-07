import { Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = ({ movie, onWatch }) => {
  if (!movie) return null;
  const navigate = useNavigate();

  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0">
        <img
          src={movie.thumbnailUrl || ""}
          alt={movie.title || ""}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      </div>

      {/* <div className="relative h-full flex items-center px-12"> */}
      <div className="relative h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-xl mt-20">
          {movie.isOriginal && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                Nova Original
              </span>
            </div>
          )}
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base text-on-surface-variant mb-6 font-medium">
            <span className="text-green-400 font-bold">
              {movie.matchPercentage}% Match
            </span>
            <span>{movie.year}</span>
            <span className="px-2 py-0.5 border border-white/20 rounded text-xs">
              {movie.rating}
            </span>
            <span>{movie.duration}</span>
            <span className="px-2 py-0.5 bg-white/10 rounded text-xs">
              {movie.quality}
            </span>
          </div>

          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`movies/${movie.id}`)}
              className="flex items-center gap-2 bg-primary text-surface px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dim transition-all hover:scale-105"
            >
              <Play className="fill-current" size={24} />
              Watch Now
            </button>
            <button className="flex items-center gap-2 bg-surface-high/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-highest transition-all border border-white/10 hover:border-white/30">
              <Info size={24} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
