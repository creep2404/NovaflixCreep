import { ChevronRight } from "lucide-react";
import { RowSkeleton } from "./RowSkeleton";
import { useNavigate } from "react-router-dom";

interface RowProps<T> {
  title: string;
  data?: T[];
  isLoading?: boolean;
  error?: unknown;
  isViewAll?: boolean;
  children: React.ReactNode;
}

export const Row = <T,>({
  title,
  data = [],
  isLoading,
  error,
  children,
  isViewAll,
}: RowProps<T>) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold">{title}</h2>
        {isViewAll && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/movies")}
              className="text-primary hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
      {isLoading && <RowSkeleton />}

      {!isLoading && !error && data && data.length > 0 && (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          {children}
        </div>
      )}

      {!isLoading && !error && (!data || data.length === 0) && (
        <div className="text-gray-400">No data available</div>
      )}
    </section>
  );
};
