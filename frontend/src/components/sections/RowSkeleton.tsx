import { SkeletonCard } from "../ui/Skeleton";

export const RowSkeleton = ({ count = 5 }) => {
  return (
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[200px] flex-shrink-0">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};
