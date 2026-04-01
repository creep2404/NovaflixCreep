import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, Clock, Crown, Filter } from 'lucide-react';
import { ScreenType } from '../types';
import { MOCK_MOVIES } from '../data/mock';
import { MovieCard } from '../components/ui/MovieCard';
import { useSimulatedData } from '../hooks/useData';
import { SkeletonCard, Skeleton } from '../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../components/ui/StateViews';

interface SearchPageProps {
  onNavigate: (screen: ScreenType, movieId?: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data: movies, isLoading, error, refetch } = useSimulatedData(MOCK_MOVIES, {
    delay: 1000,
    simulateError,
    simulateEmpty
  });

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 flex animate-in fade-in duration-500">
      {/* Sidebar Filters */}
      <aside className="w-72 fixed left-0 top-20 bottom-0 overflow-y-auto custom-scrollbar border-r border-white/5 bg-surface-low/30 backdrop-blur-xl p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-8 text-white font-headline font-semibold text-lg">
          <SlidersHorizontal size={20} className="text-primary" />
          Filters
        </div>

        <div className="space-y-8">
          {/* Test Controls */}
          <div className="flex gap-4 mb-4">
            <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
            <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">Genres</h3>
            <div className="space-y-3">
              {['Action', 'Sci-Fi', 'Thriller', 'Drama', 'Horror', 'Comedy'].map(genre => (
                <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-3 h-3 rounded-sm bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <span className="text-sm text-on-surface-variant group-hover:text-white transition-colors">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* User Rating */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">User Rating</h3>
            <div className="space-y-3">
              {[4, 3, 2, 1].map(stars => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'} />
                    ))}
                    <span className="text-xs text-on-surface-variant ml-1">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">Duration</h3>
            <div className="space-y-3">
              {['Under 1h', '1h - 2h', 'Over 2h'].map(dur => (
                <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <span className="text-sm text-on-surface-variant group-hover:text-white transition-colors flex items-center gap-2">
                    <Clock size={14} /> {dur}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Premium Toggle */}
          <div className="pt-4 border-t border-white/5">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <Crown size={16} className="text-yellow-500" /> Premium Only
              </span>
              <div className="w-10 h-5 bg-surface-highest rounded-full relative transition-colors group-hover:bg-white/10">
                <div className="w-4 h-4 bg-on-surface-variant rounded-full absolute left-0.5 top-0.5 transition-transform" />
              </div>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 px-6 lg:px-12">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="text-on-surface-variant group-focus-within:text-primary transition-colors" size={24} />
            </div>
            <input
              type="text"
              className="w-full bg-surface-high border-2 border-transparent focus:border-primary/50 rounded-full py-5 pl-16 pr-6 text-lg text-white placeholder-on-surface-variant/50 outline-none transition-all shadow-xl shadow-black/20"
              placeholder="Search movies, series, genres, or directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-2 right-2 bg-primary text-surface px-6 rounded-full font-bold hover:bg-primary-dim transition-colors">
              Search
            </button>
          </div>

          {/* Quick Picks */}
          <div className="flex items-center gap-3 mt-6 overflow-x-auto hide-scrollbar">
            <span className="text-sm text-on-surface-variant whitespace-nowrap">Quick Picks:</span>
            {['Cyberpunk', 'Space Exploration', 'Mind-Bending', 'Award Winners', 'New Releases'].map(tag => (
              <button key={tag} className="px-4 py-1.5 rounded-full bg-surface-high border border-white/5 text-sm hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-bold">
              Discovery Results 
              {!isLoading && !error && movies && <span className="text-on-surface-variant text-lg font-normal ml-2">({movies.length ? movies.length * 2 : 0} found)</span>}
            </h2>
            <button className="lg:hidden flex items-center gap-2 text-sm bg-surface-high px-4 py-2 rounded-lg border border-white/10">
              <Filter size={16} /> Filters
            </button>
          </div>
          
          {error ? (
            <ErrorState 
              title="Search failed" 
              message="We encountered an error while searching. Please try again."
              action={{ label: "Retry", onClick: refetch }}
            />
          ) : !isLoading && (!movies || movies.length === 0) ? (
            <EmptyState 
              title="No results found" 
              message="We couldn't find any movies matching your search criteria."
              action={{ label: "Clear Filters", onClick: () => setSimulateEmpty(false) }}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoading || !movies ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : (
                <>
                  {movies.map(movie => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onClick={() => onNavigate('player', movie.id)} 
                      orientation="portrait" 
                    />
                  ))}
                  {/* Duplicate for demo grid filling */}
                  {movies.map(movie => (
                    <MovieCard 
                      key={movie.id + '-dup'} 
                      movie={movie} 
                      onClick={() => onNavigate('player', movie.id)} 
                      orientation="portrait" 
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
