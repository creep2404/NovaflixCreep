import { useHomepageData } from "@/src/features/home/hooks/useHomepageData";
import { HeroSection } from "@/src/features/home/components/HeroSection";
import { Row } from "@/src/features/home/components/Row";
import { MovieRowContent } from "@/src/features/home/components/MovieRowContent";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export const HomePage = () => {
  const { trending, continueWatching } = useHomepageData();
  const { profile } = useAuth();

  const heroMovie = trending.data?.[0] || null;

  return (
    <div className="min-h-screen bg-surface pb-20 animate-in fade-in duration-500">
      {/* HERO */}
      {heroMovie && (
        <HeroSection
          movie={heroMovie}
          playTarget={{
            episodeId: heroMovie.seasons[0]?.episodes[0]?.id,
            episodeNo: heroMovie.seasons[0]?.episodes[0]?.episodeNo,
          }}
        />
      )}

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-32 relative z-10 flex flex-col gap-12">
        {/* CONTINUE WATCHING */}
        {!!profile && (
          <Row
            title="Continue Watching"
            data={continueWatching.data}
            isLoading={continueWatching.isLoading}
            error={continueWatching.error}
            isViewAll={false}
          >
            <MovieRowContent movies={continueWatching.data || [] } isContinueWatching={true} />
          </Row>
        )}

        {/* TRENDING */}
        <Row
          title="Trending"
          data={trending.data}
          isLoading={trending.isLoading}
          error={trending.error}
          isViewAll
        >
          <MovieRowContent movies={trending.data || []} />
        </Row>
      </div>
    </div>
  );
};
