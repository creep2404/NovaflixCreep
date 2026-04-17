import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorState, EmptyState } from "@/src/shared/components/state/StateViews";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useMovies } from "@/src/features/movie/hooks/useMovies";
import FiltersSection from "@/src/features/search/components/FiltersSection";
import {
  getSearchHistory,
  saveSearchHistory,
} from "@/src/features/search/utils/searchHistory";
import { useTrending } from "@/src/features/movie/hooks/useTrending";
import { useSuggest } from "@/src/features/movie/hooks/useSuggest";
import SearchBar from "./components/SearchBar";
import { MovieGrid } from "./components/MovieGrid";
import { Pagination } from "./components/Pagination";

export const SearchPage = () => {
  const [params, setParams] = useSearchParams();

  // ===============================
  // STATE
  // ===============================
  const [search, setSearch] = useState(params.get("search") || "");
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const [isInitialized, setIsInitialized] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const [draftFilters, setDraftFilters] = useState({
    genres: [] as string[],
    rating: null as number | null,
    duration: null as string | null,
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  // ===============================
  // QUERY
  // ===============================
  const filters = {
    search: debouncedSearch,
    page,
    ...appliedFilters,
  };

  const { data, isLoading, isError, isFetching } = useMovies(filters);
  const movies = data?.items ?? [];
  const meta = data?.meta;

  // ===============================
  // DROPDOWN / HISTORY
  // ===============================
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const { data: suggestData } = useSuggest(debouncedSearch);
  const { data: trendingData } = useTrending();

  // ===============================
  // HANDLERS
  // ===============================
  const handleSelect = (value: string) => {
    setSearch(value);
    saveSearchHistory(value);
    setHistory(getSearchHistory());
    setShowDropdown(false);
  };

  // reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // scroll top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ===============================
  // SYNC URL
  // ===============================
  useEffect(() => {
    if (!isInitialized) return;

    const paramsObj: any = {};

    if (search) paramsObj.search = search;
    if (page > 1) paramsObj.page = String(page);

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
  }, [search, page, appliedFilters, isInitialized]);

  // init from URL
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
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="flex-1 lg:ml-72 px-6 lg:px-12">
        {/* SEARCH BAR */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          suggestData={suggestData}
          trendingData={trendingData}
          history={history}
          handleSelect={handleSelect}
          onSearch={() => {
            setAppliedFilters(draftFilters);
            saveSearchHistory(search);
            setHistory(getSearchHistory());
          }}
          onReset={() => {
            const empty = {
              genres: [],
              rating: null,
              duration: null,
            };

            setDraftFilters(empty);
            setAppliedFilters(empty);
            setPage(1);
            setSearch("");
          }}
        />

        {/* STATES */}
        {isError ? (
          <ErrorState title="Search failed" message="Something went wrong" />
        ) : !isLoading && movies.length === 0 ? (
          <EmptyState title="No results" message="Try another keyword" />
        ) : (
          <>
            {/* GRID */}
            <MovieGrid
              movies={movies}
              isLoading={isLoading}
              isFetching={isFetching}
            />

            {/* PAGINATION */}
            <Pagination
              meta={meta}
              page={page}
              setPage={setPage}
              isFetching={isFetching}
            />
          </>
        )}
      </main>
    </div>
  );
};
