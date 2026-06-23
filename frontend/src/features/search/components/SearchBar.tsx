import { Clock, Film, Search, TrendingUp, X } from "lucide-react";

interface Props {
  search: string;
  setSearch: (v: string) => void;

  showDropdown: boolean;
  setShowDropdown: (v: boolean) => void;

  suggestData: any;
  trendingData: any;
  history: string[];

  handleSelect: (v: string) => void;

  onSearch: () => void;
  onReset: () => void;
}

const SearchBar = ({
  search,
  setSearch,
  showDropdown,
  setShowDropdown,
  suggestData,
  trendingData,
  history,
  handleSelect,
  onSearch,
  onReset,
}: Props) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative">
        {/* SEARCH PILL */}
        <div
          className="
        flex items-center gap-2
        bg-surface-high/90 backdrop-blur-xl
        border border-white/5
        rounded-full pl-6 pr-2 py-2
        shadow-2xl shadow-black/30
        transition-all duration-300
        focus-within:border-primary/40
        focus-within:shadow-primary/10
      "
        >
          <Search
            className="text-on-surface-variant peer-focus:text-primary transition-colors shrink-0"
            size={22}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
              if (e.key === "Escape") setShowDropdown(false);
            }}
            placeholder="Search movies, series, genres, or directors..."
            className="
          flex-1 bg-transparent py-3 text-lg text-white
          placeholder-on-surface-variant/50 outline-none
          min-w-0
        "
          />

          {/* CLEAR INPUT */}
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="p-2 rounded-full hover:bg-white/10 text-on-surface-variant transition-colors shrink-0"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <div className="h-7 w-px bg-white/10 shrink-0" />

          {/* RESET */}
          <button
            type="button"
            onClick={onReset}
            className="
          px-4 py-2.5 rounded-full text-sm font-medium
          text-on-surface-variant hover:text-white hover:bg-white/5
          transition-colors shrink-0
        "
          >
            Reset
          </button>

          {/* SEARCH BTN */}
          <button
            type="button"
            onClick={onSearch}
            className="
          px-6 py-3 rounded-full font-bold text-surface
          bg-primary hover:bg-primary-dim
          shadow-lg shadow-primary/20
          transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]
          shrink-0
        "
          >
            Search
          </button>
        </div>

        {/* DROPDOWN */}
        {showDropdown && (
          <div
            className="
          absolute w-full mt-3 z-50
          bg-surface-high/95 backdrop-blur-xl
          border border-white/5
          rounded-2xl shadow-2xl shadow-black/40
          overflow-hidden
        "
          >
            <div className="max-h-80 overflow-y-auto p-2">
              {/* SUGGEST */}
              {search && suggestData?.length > 0 && (
                <div className="mb-1">
                  <p className="px-3 pt-2 pb-1 text-xs font-medium text-on-surface-variant/70 uppercase tracking-wide">
                    Suggestions
                  </p>
                  {suggestData.map((movie: any) => (
                    <button
                      type="button"
                      key={movie.id}
                      onClick={() => handleSelect(movie.title)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                    >
                      <Film
                        size={16}
                        className="text-on-surface-variant shrink-0"
                      />
                      <span className="text-white/90 truncate">
                        {movie.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* NO RESULTS */}
              {search && suggestData?.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-on-surface-variant/70">
                  No matches for "{search}"
                </p>
              )}

              {/* TRENDING */}
              {!search && trendingData?.data?.length > 0 && (
                <div className="mb-1">
                  <p className="px-3 pt-2 pb-1 text-xs font-medium text-on-surface-variant/70 uppercase tracking-wide">
                    Trending
                  </p>
                  {trendingData.data.map((movie: any) => (
                    <button
                      type="button"
                      key={movie.id}
                      onClick={() => handleSelect(movie.title)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                    >
                      <TrendingUp size={16} className="text-primary shrink-0" />
                      <span className="text-white/90 truncate">
                        {movie.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* HISTORY */}
              {!search && history.length > 0 && (
                <div>
                  {trendingData?.data?.length > 0 && (
                    <div className="my-1 border-t border-white/5" />
                  )}
                  <p className="px-3 pt-2 pb-1 text-xs font-medium text-on-surface-variant/70 uppercase tracking-wide">
                    Recent Searches
                  </p>
                  {history.map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                    >
                      <Clock
                        size={16}
                        className="text-on-surface-variant shrink-0"
                      />
                      <span className="text-white/90 truncate">{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
