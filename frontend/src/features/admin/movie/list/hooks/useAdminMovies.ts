import { getMovies } from "@/src/apis/movie.api";
import { useQuery } from "@tanstack/react-query";

export const useAdminMovies = (filters: {
  search?: string;
  page?: number;
  status?: string | null;
  type?: string | null;
}) => {
  return useQuery({
    queryKey: [
      "admin-movies",
      filters.search || "",
      filters.page || 1,
      filters.status || "",
      filters.type || "",
    ],

    queryFn: async () =>
      await getMovies({
        search: filters.search,
        page: filters.page,
        limit: 10,
        status: filters.status || undefined,
        type: filters.type || undefined,
      }),

    placeholderData: (prev) => prev,
  });
};