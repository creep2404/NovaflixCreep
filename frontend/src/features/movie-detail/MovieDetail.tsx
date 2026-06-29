import { useEffect, useMemo, useState } from "react";
import CastAndCrew from "./components/CastAndCrew";
import HeroSectionDetail from "./components/HeroSection";
import TrailerModal from "./components/TrailerModal";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetail } from "@/src/features/movie/hooks/useMovieDetail";
import { MovieDetailSkeleton } from "./components/MovieDetailSkeleton";
import { Episode, Season } from "@/src/shared/types";
import { EpisodeCard } from "../video-player/components/EpisodeCard";
import { buildMovieWatchUrl } from "@/src/shared/utils/movie-routes";
import { EpisodeRow } from "./components/EpisodeRow";
import { SeasonTabs } from "./components/SeasonTabs";

export const MovieDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: movie, isLoading, error } = useMovieDetail(slug!);

  const [selectedSeasonId, setSelectedSeasonId] = useState<string>();

  const selectedSeason =
    movie?.seasons?.find((season) => season.id === selectedSeasonId) ??
    movie?.seasons?.at(-1);

  const handleSelectEpisode = (episode: Episode) => {
    if (!movie) return;
    navigate(buildMovieWatchUrl(movie.slug, episode.episodeNo, episode.id));
  };

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
            {/* <CastAndCrew members={movie?.cast || []} /> */}
            
            {movie.seasons.length >= 1 && (
              <SeasonTabs
                seasons={movie.seasons}
                selectedSeason={selectedSeason}
                onChange={(season) => setSelectedSeasonId(season.id)}
              />
            )}
            <EpisodeRow
              episodes={selectedSeason?.episodes}
              thumbnailUrl={movie?.thumbnailUrl}
              onSelect={handleSelectEpisode}
            />
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
