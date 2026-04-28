export const MovieDetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-[400px] bg-white/10 rounded-xl" />
      <div className="h-6 w-1/3 bg-white/10 rounded" />
      <div className="h-6 w-1/4 bg-white/10 rounded" />
    </div>
  );
};