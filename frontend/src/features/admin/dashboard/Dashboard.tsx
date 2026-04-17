import React, { useState } from 'react';
import { Users, Zap, Film, Clock } from 'lucide-react';
import { useSimulatedData } from '@/src/shared/hooks/useData';
import { Skeleton, SkeletonChart } from '@/src/shared/components/skeleton/Skeleton';
import { ErrorState, EmptyState } from '@/src/shared/components/state/StateViews';

const MOCK_STATS = {
  totalUsers: '1.2M',
  activeDaily: '42.8K',
  totalMovies: '1,284',
  watchTime: '24.2M'
};

export const AdminDashboard = () => {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data, isLoading, error, refetch } = useSimulatedData(MOCK_STATS, {
    delay: 1000,
    simulateError,
    simulateEmpty
  });

  if (isLoading) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-64" />
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl h-32 flex flex-col justify-between">
              <div className="flex justify-between">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-12 h-4 rounded-full" />
              </div>
              <div>
                <Skeleton className="w-20 h-3 mb-2" />
                <Skeleton className="w-16 h-8" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load dashboard" 
        message="There was an error communicating with the server. Please try again."
        action={{ label: "Retry", onClick: refetch }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState 
        title="No data available" 
        message="There is currently no data to display on the dashboard."
        action={{ label: "Refresh", onClick: () => setSimulateEmpty(false) }}
      />
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-label text-[0.6875rem] uppercase tracking-[0.15em] text-secondary">Operational Overview</span>
            <div className="flex gap-4">
              <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
              <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
            </div>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">
            Curating the <span className="text-primary-container">Pulse</span>.
          </h2>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={data.totalUsers} trend="+12%" />
        <StatCard icon={Zap} label="Active Daily" value={data.activeDaily} trend="+3.2%" />
        <StatCard icon={Film} label="Total Movies" value={data.totalMovies} trend="+12.5%" />
        <StatCard icon={Clock} label="Watch Time" value={data.watchTime} trend="OPTIMAL" trendColor="text-primary-container bg-primary-container/10" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="glass-panel p-8 rounded-xl min-h-[300px] flex flex-col">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-headline text-xl font-bold">User Growth</h3>
              <p className="text-on-surface-variant text-xs">Net acquisition over 30 days</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
            </div>
          </div>
          <div className="flex-grow flex items-end gap-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/5 to-transparent"></div>
            <div className="w-full h-32 flex items-end justify-between border-b border-outline-variant/20">
              {[40, 45, 38, 55, 60, 52, 75, 68, 82, 70, 90, 100].map((h, i) => (
                <div key={i} className={`w-[6%] rounded-t-sm ${i > 5 ? 'bg-primary-container' : 'bg-surface-variant/40'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[0.6rem] text-on-surface-variant uppercase tracking-widest">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Today</span>
          </div>
        </div>

        {/* Views by Genre */}
        <div className="glass-panel p-8 rounded-xl flex flex-col">
          <h3 className="font-headline text-xl font-bold mb-8">Views by Genre</h3>
          <div className="space-y-6">
            <GenreBar label="Sci-Fi" views="842K views" percentage={85} color="bg-primary-container" />
            <GenreBar label="Thriller" views="610K views" percentage={60} color="bg-secondary" />
            <GenreBar label="Noir" views="420K views" percentage={45} color="bg-secondary" />
            <GenreBar label="Cosmic" views="215K views" percentage={25} color="bg-secondary" />
            <GenreBar label="Drama" views="128K views" percentage={15} color="bg-secondary" />
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, trendColor = "text-green-400 bg-green-500/10" }: any) => (
  <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <Icon className="text-secondary" size={20} />
      <span className={`font-label text-[0.625rem] px-2 py-0.5 rounded-full font-bold ${trendColor}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="font-label text-[0.6875rem] text-on-surface-variant uppercase tracking-wider">{label}</p>
      <p className="font-headline text-2xl font-bold text-on-surface mt-1">{value}</p>
    </div>
  </div>
);

const GenreBar = ({ label, views, percentage, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-label">
      <span className="text-on-surface">{label}</span>
      <span className="text-on-surface-variant">{views}</span>
    </div>
    <div className="w-full h-1.5 bg-surface-variant/30 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);
