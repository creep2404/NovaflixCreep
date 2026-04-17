import { Search } from "lucide-react";

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
      <div className="relative group">
        {/* ICON */}
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search
            className="text-on-surface-variant group-focus-within:text-primary transition-colors"
            size={24}
          />
        </div>

        {/* INPUT */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Search movies, series, genres, or directors..."
          className="w-full bg-surface-high border-2 border-transparent focus:border-primary/50 rounded-full py-5 pl-16 pr-6 text-lg text-white placeholder-on-surface-variant/50 outline-none transition-all shadow-xl shadow-black/20"
        />

        {/* DROPDOWN */}
        {showDropdown && (
          <div className="absolute w-full mt-2 bg-surface-high rounded-xl shadow-lg p-4 z-50">
            {/* SUGGEST */}
            {search && suggestData?.data?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-white/50 mb-2">Suggestions</p>
                {suggestData.data.map((movie: any) => (
                  <div
                    key={movie.id}
                    onClick={() => handleSelect(movie.title)}
                    className="p-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}

            {/* TRENDING */}
            {!search && trendingData?.data?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-white/50 mb-2">Trending</p>
                {trendingData.data.map((movie: any) => (
                  <div
                    key={movie.id}
                    onClick={() => handleSelect(movie.title)}
                    className="p-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}

            {/* HISTORY */}
            {!search && history.length > 0 && (
              <div>
                <p className="text-xs text-white/50 mb-2">
                  Recent Searches
                </p>
                {history.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(item)}
                    className="p-2 hover:bg-white/10 rounded cursor-pointer"
                  >
                    🕘 {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SEARCH BTN */}
        <button
          onClick={onSearch}
          className="absolute inset-y-2 right-2 bg-primary text-surface px-6 rounded-full font-bold hover:bg-primary-dim transition-colors hover:scale-105"
        >
          Search
        </button>

        {/* RESET BTN */}
        <button
          onClick={onReset}
          className="absolute inset-y-2 right-32 bg-primary/70 text-surface px-6 rounded-full font-bold hover:bg-primary-dim transition-colors hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;