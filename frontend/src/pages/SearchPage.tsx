import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { MovieCard } from "../components/ui/MovieCard";
import { SkeletonCard } from "../components/ui/Skeleton";
import { ErrorState, EmptyState } from "../components/ui/StateViews";
import { useDebounce } from "../hooks/useDebounce";
import { useMovies } from "../hooks/useMovies";
import FiltersSection from "../components/ui/FiltersSection";
import { getSearchHistory, saveSearchHistory } from "../utils/searchHistory";
import { useTrending } from "../hooks/useTrending";
import { useSuggest } from "../hooks/useSuggest";

export const SearchPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  // ===============================
  // STATE
  // ===============================
  const [search, setSearch] = useState(params.get("search") || "");
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [isInitialized, setIsInitialized] = useState(false);

  // debounce input
  const debouncedSearch = useDebounce(search, 500);

  const [draftFilters, setDraftFilters] = useState({
    genres: [] as string[],
    rating: null as number | null,
    duration: null as string | null,
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  // ===============================
  // REACT QUERY
  // ===============================
  const filters = {
    search: debouncedSearch,
    page,
    ...appliedFilters,
  };

  const { data, isLoading, isError, isFetching } = useMovies(filters);
  const movies = data?.data || [];
  const meta = data?.meta;

  // ===============================
  // OTHER STATES (Inprogress)
  // ===============================
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Lấy lịch sử search từ localStorage khi component mount và lưu vào state `history` để hiển thị trong dropdown
  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  // SUGGEST & TRENDING (Inprogress)
  const { data: suggestData } = useSuggest(debouncedSearch);
  const { data: trendingData } = useTrending();

  // ===============================
  // HANDLERS
  // ===============================
  const handleSelect = (value: string) => {
    setSearch(value);
    saveSearchHistory(value);
    setShowDropdown(false);
  };
  // RESET PAGE KHI SEARCH THAY ĐỔI
  // ===============================
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // SCROLL TOP KHI ĐỔI PAGE
  // ===============================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ===============================
  // SYNC FILTERS
  // ===============================
  useEffect(() => {
    if (!isInitialized) return;

    const paramsObj: any = {};

    if (searched) paramsObj.search = search;
    if (page > 1) paramsObj.page = String(page); // page=1 không cần

    if (appliedFilters.genres?.length > 0) {
      paramsObj.genres = appliedFilters.genres.join(",");
    }

    if (appliedFilters.rating !== null) {
      paramsObj.rating = appliedFilters.rating.toString();
    }

    if (appliedFilters.duration) {
      paramsObj.duration = appliedFilters.duration;
    }

    setParams(paramsObj, { replace: true });
  }, [searched, page, appliedFilters, isInitialized]);

  // Khi mount, đọc filters từ URL để set state
  useEffect(() => {
    const urlSearch = params.get("search") || "";
    const urlPage = Number(params.get("page")) || 1;

    const urlGenres = params.get("genres");
    const urlRating = params.get("rating");
    const urlDuration = params.get("duration");

    const parsedFilters = {
      genres: urlGenres ? urlGenres.split(",") : [],
      rating: urlRating ? Number(urlRating) : null,
      duration: urlDuration || null,
    };

    setSearch(urlSearch);
    setPage(urlPage);

    setDraftFilters(parsedFilters);
    setAppliedFilters(parsedFilters);

    setIsInitialized(true); 
  }, []);

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 flex animate-in fade-in duration-500">
      {/* ===============================
          SIDEBAR
      =============================== */}
      <FiltersSection
        selectedGenres={draftFilters.genres}
        onChangeGenres={(genres) =>
          setDraftFilters((prev) => ({ ...prev, genres }))
        }
        rating={draftFilters.rating}
        onChangeRating={(rating) =>
          setDraftFilters((prev) => ({ ...prev, rating }))
        }
        duration={draftFilters.duration}
        onChangeDuration={(duration) =>
          setDraftFilters((prev) => ({ ...prev, duration }))
        }
      />

      {/* ===============================
          MAIN CONTENT
      =============================== */}

      <main className="flex-1 lg:ml-72 px-6 lg:px-12">
        {/* SEARCH BAR */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search
                className="text-on-surface-variant group-focus-within:text-primary transition-colors"
                size={24}
              />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Search movies, series, genres, or directors..."
              // className="w-full pl-14 pr-4 py-4 rounded-full bg-surface-high text-white outline-none"
              className="w-full bg-surface-high border-2 border-transparent focus:border-primary/50 rounded-full py-5 pl-16 pr-6 text-lg text-white placeholder-on-surface-variant/50 outline-none transition-all shadow-xl shadow-black/20"
            />
            {showDropdown && (
              <div className="absolute w-full mt-2 bg-surface-high rounded-xl shadow-lg p-4 z-50">
                {/* ===============================
        SUGGEST
    =============================== */}
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

                {/* ===============================
                 TRENDING
                =============================== */}
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

                {/* ===============================
                HISTORY
                =============================== */}
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
            <button
              onClick={() => {
                setAppliedFilters(draftFilters);
                setSearched(search);
              }}
              className="absolute inset-y-2 right-2 bg-primary text-surface px-6 rounded-full font-bold hover:bg-primary-dim transition-colors hover:scale-105 cursor-pointer"
            >
              Search
            </button>
            <button
              onClick={() => {
                const empty = {
                  genres: [],
                  rating: null,
                  duration: null,
                };

                setDraftFilters(empty);
                setAppliedFilters(empty);
                setPage(1);
                setSearch("");
                setSearched("");
              }}
              className="absolute inset-y-2  bg-primary text-surface px-6 rounded-full font-bold hover:bg-primary-dim transition-colors hover:scale-105 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ===============================
            STATES
        =============================== */}
        {isError ? (
          <ErrorState title="Search failed" message="Something went wrong" />
        ) : !isLoading && movies.length === 0 ? (
          <EmptyState title="No results" message="Try another keyword" />
        ) : (
          <>
            {/* ===============================
                GRID
            =============================== */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              ))}

              {/* skeleton khi fetch page mới */}
              {(isLoading || isFetching) &&
                Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>

            {/* ===============================
                PAGINATION
            =============================== */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                {Array.from({ length: meta.totalPages }).map((_, i) => {
                  const p = i + 1;

                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      disabled={isFetching}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition hover:scale-105 cursor-pointer ${
                        page === p
                          ? "bg-primary text-black"
                          : "bg-surface-high text-white hover:bg-white/10"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
