import { useGenres } from "@/src/features/movie/hooks/useGenres";
import { Genre } from "@/src/shared/types";
import { useEffect, useState } from "react";

type Props = {
  value: string[];
  onChange: (v: string[]) => void;
};
export function GenreField({ value, onChange }: Props) {
  const [skip, setSkip] = useState(0);
  const limit = 6;

  const [allGenres, setAllGenres] = useState<Genre[]>([]);

  const { data, isFetching } = useGenres(skip);

  // append + tránh duplicate
  useEffect(() => {
    if (Array.isArray(data?.dataGenre)) {
      setAllGenres((prev) => {
        const newData = data.dataGenre.filter(
          (item) => !prev.some((p) => p.id === item.id),
        );
        return [...prev, ...newData];
      });
    }
  }, [data]);

  const hasMore = data?.meta?.hasMore ?? false;

  // toggle select
  const toggleGenre = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((g) => g !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {allGenres.map((genre) => {
          const isActive = value.includes(genre.id);

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => toggleGenre(genre.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed border-primary-fixed shadow-[0_0_0_1px_rgba(255,209,101,0.35)] scale-[1.02]"
                    : "bg-surface-container-highest text-on-surface-variant border-outline-variant hover:border-primary-fixed/60 hover:bg-surface-container-high"
                }
              `}
            >
              {genre.name}
            </button>
          );
        })}

        {/* LOAD MORE BUTTON */}
        {hasMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10 disabled:opacity-50"
          >
            {isFetching ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
