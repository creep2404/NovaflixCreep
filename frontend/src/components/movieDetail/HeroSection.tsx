import { Star, Tv, Play, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  movie: any;
  onWatchTrailer: () => void;
}
export default function HeroSection({
  movie,
  onWatchTrailer,
}: HeroSectionProps) {
  const navigate = useNavigate();

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
        {/* <div className="absolute inset-0 hero-gradient"></div> */}
      </div>

      {/* BOX CHỈ BAO CONTENT */}
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
            <span>{movie?.year}</span>
            <span>{movie?.genres?.join(" / ")}</span>
            <span>{movie?.duration}</span>
          </div>

          <p className="text-on-surface text-lg md:text-xl leading-relaxed max-w-2xl mb-10 opacity-90">
            {movie?.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                navigate(`/movie/watch/${movie?.id}`, { replace: true })
              }
              className="bg-primary-fixed text-on-primary px-10 py-4 rounded-full font-bold flex items-center gap-3 
hover:shadow-[0_0_25px_rgba(226,229,203,0.4)] 
hover:scale-[1.05] 
active:scale-95 
transition-all duration-300 ease-out"
            >
              <Play size={20} className="fill-current" />
              Play
            </button>

            <button
              onClick={onWatchTrailer}
              className="bg-surface-variant/40 backdrop-blur-xl border border-white/10 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 
hover:bg-surface-variant/60 
hover:scale-[1.03] 
hover:-translate-y-0.5 
hover:shadow-lg 
active:scale-95 
transition-all duration-300 ease-out"
            >
              <Film size={20} />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
