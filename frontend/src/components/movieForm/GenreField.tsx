import { useGenres } from "@/src/hooks/useGenres";
import { Genre } from "@/src/common/types";
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
      <label className="block text-[10px] font-label font-bold uppercase tracking-[0.15em] text-on-surface-variant">
        Genre
      </label>
      <div className="flex flex-wrap gap-2">
        {allGenres.map((genre) => {
          const isActive = value.includes(genre.id);

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => toggleGenre(genre.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors
                ${
                  isActive
                    ? "bg-primary-fixed text-on-primary-fixed border-primary-fixed"
                    : "bg-surface-container-highest text-on-surface-variant border-outline-variant/20 hover:border-primary-fixed/40"
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
