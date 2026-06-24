import { useEffect, useState } from "react";
import { Clock, Crown, SlidersHorizontal, Star } from "lucide-react";
import { Genre } from "@/src/shared/types";
import { useGenres } from "@/src/features/movie/hooks/useGenres";
import GenreFilter from "@/src/features/search/components/GenreFilter";

interface Props {
  type: string | null;
  onChangeType: (type: string | null) => void;

  selectedGenres: string[];
  onChangeGenres: (genres: string[]) => void;

  rating: number | null;
  onChangeRating: (rating: number | null) => void;

  duration: string | null;
  onChangeDuration: (duration: string | null) => void;
}

const MOVIE_TYPE_FILTERS = [
  { label: "All", value: null },
  { label: "Movies", value: "movie" },
  { label: "Series", value: "series" },
];

const DURATION_ARRAY = ["Under 1h", "1h - 2h", "Over 2h"];

const FiltersSection = ({
  type,
  onChangeType,
  selectedGenres,
  onChangeGenres,
  rating,
  onChangeRating,
  duration,
  onChangeDuration,
}: Props) => {
  const [skip, setSkip] = useState(0);

  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const { data, isFetching } = useGenres(skip);

  // append data + avoid duplicate
  useEffect(() => {
    if (Array.isArray(data?.dataGenre)) {
      setAllGenres((prev) => {
        const newData = data?.dataGenre.filter(
          (item) => !prev.some((p) => p.id === item.id),
        );
        return [...prev, ...newData];
      });
    }
  }, [data]);

  return (
    <div>
      {/* Sidebar Filters */}
      <aside className="w-72 fixed left-0 top-20 bottom-0 overflow-y-auto custom-scrollbar border-r border-white/5 bg-surface-low/30 backdrop-blur-xl p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-8 text-white font-headline font-semibold text-lg">
          <SlidersHorizontal size={20} className="text-primary" />
          Filters
        </div>

        <div className="space-y-8">
          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">
              Movie Type
            </h3>

            <div className="space-y-3">
              {MOVIE_TYPE_FILTERS.map((item) => {
                const isSelected = type === item.value;

                return (
                  <label
                    key={item.value}
                    onClick={() => onChangeType(item.value)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
            ${
              isSelected
                ? "border-primary"
                : "border-white/20 group-hover:border-primary"
            }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-primary transition-opacity
              ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              }`}
                      />
                    </div>

                    <span
                      className={`text-sm transition-colors
            ${
              isSelected
                ? "text-white"
                : "text-on-surface-variant group-hover:text-white"
            }`}
                    >
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Genre Filter */}
          <GenreFilter
            selectedGenres={selectedGenres}
            onChangeGenres={onChangeGenres}
          />

          {/* User Rating */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">
              User Rating
            </h3>
            <div className="space-y-3">
              {[4, 3, 2, 1].map((stars) => {
                const isSelected = rating === stars;

                return (
                  <label
                    key={stars}
                    onClick={() => onChangeRating(isSelected ? null : stars)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
          ${
            isSelected
              ? "border-primary"
              : "border-white/20 group-hover:border-primary"
          }
        `}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-primary transition-opacity
            ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
          `}
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < stars
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-white/20"
                          }
                        />
                      ))}
                      <span className="text-xs text-on-surface-variant ml-1">
                        & Up
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-sm font-medium text-on-surface-variant mb-4 uppercase tracking-wider">
              Duration
            </h3>
            <div className="space-y-3">
              {DURATION_ARRAY.map((dur) => {
                const isSelected = duration === dur;

                return (
                  <label
                    key={dur}
                    onClick={() => onChangeDuration(isSelected ? null : dur)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
          ${
            isSelected
              ? "border-primary"
              : "border-white/20 group-hover:border-primary"
          }
        `}
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-primary transition-opacity
            ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
          `}
                      />
                    </div>

                    <span
                      className={`text-sm flex items-center gap-2 transition-colors
          ${
            isSelected
              ? "text-white"
              : "text-on-surface-variant group-hover:text-white"
          }
        `}
                    >
                      <Clock size={14} /> {dur}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Premium Toggle */}
          <div className="pt-4 border-t border-white/5">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <Crown size={16} className="text-yellow-500" /> Premium Only
              </span>
              <div className="w-10 h-5 bg-surface-highest rounded-full relative transition-colors group-hover:bg-white/10">
                <div className="w-4 h-4 bg-on-surface-variant rounded-full absolute left-0.5 top-0.5 transition-transform" />
              </div>
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FiltersSection;
