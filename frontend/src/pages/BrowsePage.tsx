import React, { useState } from 'react';
import { Play, Info, ChevronRight, MessageSquare } from 'lucide-react';
import { Movie, ScreenType } from '../types';
import { MOCK_MOVIES } from '../data/mock';
import { MovieCard } from '../components/ui/MovieCard';
import { useSimulatedData } from '../hooks/useData';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../components/ui/StateViews';

interface BrowsePageProps {
  onNavigate: (screen: ScreenType, movieId?: string) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ onNavigate }) => {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data: movies, isLoading, error, refetch } = useSimulatedData(MOCK_MOVIES, {
    delay: 800,
    simulateError,
    simulateEmpty
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface pb-20 animate-in fade-in duration-500">
        {/* Hero Skeleton */}
        <div className="relative h-[85vh] w-full">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
          <div className="absolute bottom-32 left-6 lg:left-12 max-w-2xl w-full">
            <Skeleton className="h-16 w-3/4 mb-6" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-24 w-full mb-10" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-40 rounded-full" />
              <Skeleton className="h-14 w-40 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Rows Skeleton */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-32 relative z-10 flex flex-col gap-12">
          <section>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-[280px] flex-shrink-0">
                  <Skeleton className="w-full aspect-video rounded-xl" />
                </div>
              ))}
            </div>
          </section>
          <section>
            <Skeleton className="h-8 w-64 mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[200px] flex-shrink-0">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-[80vh]">
        <ErrorState 
          title="Failed to load content" 
          message="We couldn't load the movies right now. Please check your connection and try again."
          action={{ label: "Retry", onClick: refetch }}
        />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="pt-24 min-h-[80vh]">
        <EmptyState 
          title="No movies available" 
          message="There are currently no movies to display in this section."
          action={{ label: "Refresh", onClick: () => setSimulateEmpty(false) }}
        />
      </div>
    );
  }

  const heroMovie = movies[0];

  return (
    <div className="min-h-screen bg-surface pb-20 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={heroMovie.imageUrl} 
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        </div>

        <div className="relative h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
          <div className="max-w-2xl mt-20">
            {heroMovie.isOriginal && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-bold tracking-widest text-sm uppercase">Nova Original</span>
              </div>
            )}
            
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
              {heroMovie.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm md:text-base text-on-surface-variant mb-6 font-medium">
              <span className="text-green-400 font-bold">{heroMovie.matchPercentage}% Match</span>
              <span>{heroMovie.year}</span>
              <span className="px-2 py-0.5 border border-white/20 rounded text-xs">{heroMovie.rating}</span>
              <span>{heroMovie.duration}</span>
              <span className="px-2 py-0.5 bg-white/10 rounded text-xs">{heroMovie.quality}</span>
            </div>
            
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-xl">
              {heroMovie.description}
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('player', heroMovie.id)}
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

      {/* Content Rows */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-32 relative z-10 flex flex-col gap-12">
        
        {/* Trending Row */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-headline font-bold">Trending Now</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
              <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
              <button className="text-primary hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
            {movies.map(movie => (
              <div key={movie.id} className="w-[280px] flex-shrink-0">
                <MovieCard movie={movie} onClick={() => onNavigate('player', movie.id)} orientation="landscape" />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Row */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-headline font-bold">Psychological Thrillers</h2>
            <button className="text-primary hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
            {movies.slice().reverse().map(movie => (
              <div key={movie.id} className="w-[200px] flex-shrink-0">
                <MovieCard movie={movie} onClick={() => onNavigate('player', movie.id)} orientation="portrait" />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Floating Chat Widget */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-surface rounded-full flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-110 transition-transform z-50">
        <MessageSquare size={24} className="fill-current" />
      </button>
    </div>
  );
};
