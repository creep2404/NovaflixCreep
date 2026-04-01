import React, { useState } from 'react';
import { useSimulatedData } from '../../hooks/useData';
import { Skeleton, SkeletonChart } from '../../components/ui/Skeleton';
import { Activity, TrendingUp, Users, MonitorPlay } from 'lucide-react';
import { ErrorState, EmptyState } from '../../components/ui/StateViews';

export const AdminAnalytics = () => {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data, isLoading, error, refetch } = useSimulatedData({ ready: true }, {
    delay: 1500,
    simulateError,
    simulateEmpty
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-panel p-8 rounded-xl h-40">
              <Skeleton className="h-4 w-32 mb-6" />
              <Skeleton className="h-10 w-24" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SkeletonChart />
          </div>
          <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center">
             <Skeleton className="w-48 h-48 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Analytics Unavailable" 
        message="We couldn't load the analytics data. Please check your connection and try again."
        action={{ label: "Retry", onClick: refetch }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState 
        title="No Analytics Data" 
        message="There is not enough data to generate analytics yet."
        action={{ label: "Refresh", onClick: () => setSimulateEmpty(false) }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-end gap-4">
        <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
        <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
      </div>

      {/* Hero Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-xl shadow-lg border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-on-surface-variant text-sm font-medium tracking-wider uppercase">Avg Watch Time</span>
            <Activity className="text-primary" size={24} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">1h 42m</h2>
            <span className="text-green-400 text-xs font-bold">+8.4%</span>
          </div>
          <p className="text-on-surface-variant text-xs mt-2 opacity-60">Across all platform devices</p>
        </div>

        <div className="glass-panel p-8 rounded-xl shadow-lg border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-on-surface-variant text-sm font-medium tracking-wider uppercase">Total Streams</span>
            <MonitorPlay className="text-primary" size={24} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">4.2M</h2>
            <span className="text-green-400 text-xs font-bold">+12.1%</span>
          </div>
          <p className="text-on-surface-variant text-xs mt-2 opacity-60">Real-time active sessions</p>
        </div>

        <div className="glass-panel p-8 rounded-xl shadow-lg border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-on-surface-variant text-sm font-medium tracking-wider uppercase">Conversion</span>
            <TrendingUp className="text-primary" size={24} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">12.4%</h2>
            <span className="text-green-400 text-xs font-bold">+2.3%</span>
          </div>
          <p className="text-on-surface-variant text-xs mt-2 opacity-60">Free to Premium tier</p>
        </div>
      </section>

      {/* Main Analytics View */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-xl p-8 border border-outline-variant/5">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Views Over Time</h3>
              <p className="text-on-surface-variant text-sm">Last 30-day performance cycle</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-surface-container-highest text-xs font-medium text-primary">Daily</button>
              <button className="px-4 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-highest transition-colors">Weekly</button>
            </div>
          </div>
          
          <div className="h-64 relative flex items-end gap-2 px-2">
            <div className="absolute inset-0 flex items-end">
              <svg className="w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"></stop>
                    <stop offset="100%" stopColor="transparent"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,150 Q50,120 100,140 T200,80 T300,110 T400,40 T500,90 T600,30 T700,70 T800,20 T900,60 T1000,40 V200 H0 Z" fill="url(#chartGradient)"></path>
                <path d="M0,150 Q50,120 100,140 T200,80 T300,110 T400,40 T500,90 T600,30 T700,70 T800,20 T900,60 T1000,40" fill="none" stroke="#ffffff" strokeWidth="3"></path>
              </svg>
            </div>
            <div className="w-full flex justify-between text-[10px] text-on-surface-variant font-medium mt-4 absolute -bottom-8">
              <span>01 OCT</span><span>07 OCT</span><span>14 OCT</span><span>21 OCT</span><span>28 OCT</span><span>30 OCT</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-8 border border-outline-variant/5 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-on-surface mb-8 w-full text-left">Engagement by Device</h3>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3.5"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#ffffff" strokeDasharray="65 100" strokeDashoffset="0" strokeWidth="4"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#9ca3af" strokeDasharray="20 100" strokeDashoffset="-65" strokeWidth="4"></circle>
              <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#4b5563" strokeDasharray="15 100" strokeDashoffset="-85" strokeWidth="4"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-on-surface">94%</span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Active</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-xs text-on-surface-variant">TV Interface</span>
              </div>
              <span className="text-xs font-bold text-on-surface">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span className="text-xs text-on-surface-variant">Mobile App</span>
              </div>
              <span className="text-xs font-bold text-on-surface">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                <span className="text-xs text-on-surface-variant">Web Browser</span>
              </div>
              <span className="text-xs font-bold text-on-surface">15%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
