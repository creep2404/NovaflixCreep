import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-surface-variant/50 rounded-md ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = () => (
  <div className="flex flex-col gap-2 w-full">
    <Skeleton className="w-full aspect-[2/3] rounded-xl" />
    <Skeleton className="h-4 w-3/4 mt-2" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="w-full bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
    <div className="flex border-b border-white/5 bg-surface-container/50 p-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1 mx-2" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex p-4 border-b border-white/5">
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton key={c} className="h-8 flex-1 mx-2" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="glass-panel p-8 rounded-xl min-h-[300px] flex flex-col">
    <div className="flex justify-between items-end mb-8">
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-2 h-2 rounded-full" />
        <Skeleton className="w-2 h-2 rounded-full" />
      </div>
    </div>
    <div className="flex-grow flex items-end gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
      ))}
    </div>
  </div>
);
