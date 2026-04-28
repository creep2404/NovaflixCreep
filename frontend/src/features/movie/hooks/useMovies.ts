import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/src/apis/movie.api";
import { mapDuration } from "@/src/features/movie/utils/mappingDuration";

export const useMovies = (filters: {
  search?: string;
  page?: number;
  genres?: string[];
  rating?: number | null;
  duration?: string | null;
}) => {
  return useQuery({
    queryKey: [
      "movies",
      filters.search || "",
      filters.page || 1,
      filters.genres?.join(",") || "",
      filters.rating ?? "",
      filters.duration ?? "",
    ],

    queryFn: async () => {
      return await getMovies({
        search: filters.search,
        page: filters.page,
        limit: 10,
        genres: filters.genres,
        rating: filters.rating,
        duration: mapDuration(filters.duration),
      });
    },

    placeholderData: (prev) => prev,
  });
};
