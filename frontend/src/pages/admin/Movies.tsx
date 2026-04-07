import React, { useState } from 'react';
import { MoreVertical, Plus, Filter, Download } from 'lucide-react';
import { useSimulatedData } from '../../hooks/useData';
import { Skeleton, SkeletonTable } from '../../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../../components/ui/StateViews';
import { MOCK_MOVIES } from '../../data/mock';

export const AdminMovies = () => {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data: movies, isLoading, error, refetch } = useSimulatedData(MOCK_MOVIES, {
    delay: 1000,
    simulateError,
    simulateEmpty
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 rounded-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
        <SkeletonTable rows={6} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load movies" 
        message="There was an error communicating with the server. Please try again."
        action={{ label: "Retry", onClick: refetch }}
      />
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-headline font-bold">Movies Library</h2>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-black hover:bg-white/90 transition-all font-semibold rounded-full text-sm active:scale-95">
            <Plus size={18} /> Add Movie
          </button>
        </div>
        <EmptyState 
          title="No movies found" 
          message="Your movie library is currently empty. Start by adding your first movie."
          action={{ label: "Add Movie", onClick: () => setSimulateEmpty(false) }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="bg-surface-container-high border-none rounded-full py-2.5 pl-4 pr-6 text-sm focus:ring-1 focus:ring-outline-variant w-64 transition-all duration-300 outline-none text-white placeholder-on-surface-variant"
          />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
          <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest transition-colors text-sm font-medium rounded-full text-on-surface">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-black hover:bg-white/90 transition-all font-semibold rounded-full text-sm active:scale-95">
            <Plus size={18} /> Add Movie
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="px-8 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Movie</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Year</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Rating</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Status</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {movies.map((movie) => (
                <tr key={movie.id} className="group hover:bg-white/[0.02] transition-colors cursor-default">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={movie.thumbnailUrl} alt={movie.title} className="w-12 h-16 rounded-md object-cover" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface text-sm">{movie.title}</span>
                        <span className="text-xs text-on-surface-variant">{movie.genres.join(', ')}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-on-surface-variant">{movie.year}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded">
                      {movie.rating}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded">
                      Published
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors ml-auto text-on-surface-variant hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
