import { useEffect, useState } from "react";
import CastAndCrew from "./components/CastAndCrew";
import HeroSection from "./components/HeroSection";
import TrailerModal from "./components/TrailerModal";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "@/src/features/movie/hooks/useMovieDetail";
import { MovieDetailSkeleton } from "./components/MovieDetailSkeleton";

export const MovieDetail = () => {
  const { id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: movie, isLoading, error } = useMovieDetail(id);

  return (
    <div className="pt-24 min-h-screen bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <main>
        {/* LOADING */}
        {isLoading && <MovieDetailSkeleton />}

        {/* ERROR */}
        {!isLoading && error && (
          <div className="text-red-500 px-6">Failed to load movie</div>
        )}

        {!isLoading && !error && movie && (
          <>
            <HeroSection
              movie={movie}
              onWatchTrailer={() => setIsTrailerOpen(true)}
            />

            <CastAndCrew members={movie?.cast || []} />
          </>
        )}
      </main>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie?.trailerUrl}
      />
    </div>
  );
};
