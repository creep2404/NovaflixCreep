// pages/BrowsePage.tsx
import { useNavigate } from "react-router-dom";
import { useHomepageData } from "../hooks/useHomepageData";
import { HeroSection } from "../components/sections/HeroSection";
import { Row } from "../components/sections/Row";
import { MovieCard } from "../components/ui/MovieCard";
import { Skeleton } from "../components/ui/Skeleton";
import { ChevronRight } from "lucide-react";

export const BrowsePage = () => {
  const navigate = useNavigate();

  const { trending, thrillers, continueWatching } = useHomepageData();
  // console.log("🔥 trending:", trending);
  // console.log("🔥 thrillers:", thrillers);
  // console.log("🔥 continueWatching:", continueWatching);

  const heroMovie =
    trending.data && trending.data.length > 0 ? trending.data[0] : null;

  return (
    <div className="min-h-screen bg-surface pb-20 animate-in fade-in duration-500">
      {/* HERO */}
      {heroMovie && (
        <HeroSection
          movie={heroMovie}
          onWatch={() => navigate(`/movies/${heroMovie.id}/play`)}
        />
      )}

      {/* <div className="px-6 mt-10 space-y-12"> */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-32 relative z-10 flex flex-col gap-12">
        {/* CONTINUE WATCHING */}
        <Row
          title="Continue Watching"
          data={continueWatching.data}
          isLoading={continueWatching.isLoading}
          error={continueWatching.error}
          isViewAll={false}
        >
          {continueWatching.data?.data?.map((movie) => (
            <div key={movie.id} className="w-[280px] flex-shrink-0">
              <MovieCard
                movie={movie}
                progress={movie.progress ?? 0}
                onClick={() => navigate(`/movie/${movie.id}`)}
                orientation="landscape"
              />
            </div>
          ))}
        </Row>

        {/* TRENDING */}
        <Skeleton className="h-8 w-64 mb-6" />
        <Row
          title="Trending"
          data={trending.data}
          isLoading={trending.isLoading}
          error={trending.error}
          isViewAll
        >
          {trending.data?.map((movie) => (
            <div key={movie.id} className="w-[280px] flex-shrink-0">
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
                orientation="landscape"
              />
            </div>
          ))}
        </Row>

        {/* THRILLERS */}
        <Row
          title="Thrillers"
          data={thrillers.data}
          isLoading={thrillers.isLoading}
          error={thrillers.error}
          isViewAll={false}
        >
          {thrillers.data?.map((movie) => (
            <div key={movie.id} className="w-[200px] flex-shrink-0">
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
                orientation="portrait"
              />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
};
