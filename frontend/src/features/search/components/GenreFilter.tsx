import { useEffect, useState } from "react";
import { useGenres } from "@/src/features/movie/hooks/useGenres";
import { Genre } from "@/src/shared/types";

interface Props {
  selectedGenres: string[];
  onChangeGenres: (genres: string[]) => void;
}

const GenreFilter = ({ selectedGenres, onChangeGenres }: Props) => {
  const [skip, setSkip] = useState(0);
  const limit = 6;

  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const { data, isFetching } = useGenres(skip);

  useEffect(() => {
    if (Array.isArray(data?.dataGenre)) {
      setAllGenres((prev) => {
        const map = new Map(prev.map((g) => [g.id, g]));
        data.dataGenre.forEach((g) => map.set(g.id, g));
        return Array.from(map.values());
      });
    }
  }, [data]);

  const hasMore = data?.meta?.hasMore ?? false;

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">
        Genres
      </h3>

      <div className="space-y-3">
        {allGenres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.name);

          return (
            <label
              key={genre.id}
              onClick={() => {
                const updated = isSelected
                  ? selectedGenres.filter((g) => g !== genre.name)
                  : [...selectedGenres, genre.name];

                onChangeGenres(updated);
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-6 h-6 rounded border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors                   
px-4 py-2 rounded cursor-pointer transition
  ${isSelected ? "bg-primary text-white" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                <div className="w-4 h-4 rounded-sm bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>

              <span className="text-base text-on-surface-variant group-hover:text-white transition-colors">
                {genre.name}
              </span>
            </label>
          );
        })}
      </div>

      {hasMore && (
        <div>
          <button
            onClick={() => setSkip((prev) => prev + limit)}
            disabled={isFetching}
            className="bg-primary text-surface px-6 py-1 rounded-full font-bold hover:bg-primary-dim transition-colors hover:scale-105 cursor-pointer"
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
