import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useMovies } from "@/src/features/movie/hooks/useMovies";

export const useSearchPage = () => {
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [filters, setFilters] = useState({
    genres: [] as string[],
    rating: null as number | null,
    duration: null as string | null,
  });

  const debouncedSearch = useDebounce(search, 500);

  const query = {
    search: debouncedSearch,
    page,
    ...filters,
  };

  const { data, isLoading, isError, isFetching } = useMovies(query);

  // sync URL
  useEffect(() => {
    const obj: any = {};

    if (debouncedSearch) obj.search = debouncedSearch;
    if (page > 1) obj.page = page;

    if (filters.genres.length) obj.genres = filters.genres.join(",");
    if (filters.rating !== null) obj.rating = filters.rating;
    if (filters.duration) obj.duration = filters.duration;

    setParams(obj, { replace: true });
  }, [debouncedSearch, page, filters]);

  return {
    search,
    setSearch,
    page,
    setPage,
    filters,
    setFilters,

    data,
    isLoading,
    isError,
    isFetching,
  };
};