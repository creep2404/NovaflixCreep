import { useEffect, useState } from "react";
import CastAndCrew from "./components/CastAndCrew";
import HeroSectionDetail from "./components/HeroSection";
import TrailerModal from "./components/TrailerModal";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "@/src/features/movie/hooks/useMovieDetail";
import { MovieDetailSkeleton } from "./components/MovieDetailSkeleton";
import { SeasonTabs } from "./components/SeasonTab";
import { SeasonNew } from "@/src/shared/types";

export const MovieDetail = () => {
  const { id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: movie, isLoading, error } = useMovieDetail(id);
  
  const [selectedSeason, setSelectedSeason] = useState<SeasonNew>();
  useEffect(() => {
    if (movie?.seasons?.length) {
      setSelectedSeason(movie.seasons.at(-1));
    }
  }, [movie]);
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
            <HeroSectionDetail
              movie={movie}
              selectedSeason={selectedSeason}
              onWatchTrailer={() => setIsTrailerOpen(true)}
            />

            <SeasonTabs
              seasons={movie.seasons}
              selectedSeason={selectedSeason}
              onChange={setSelectedSeason}
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
