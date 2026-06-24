import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/src/apis/movie.api";
import { mapDuration } from "@/src/features/movie/utils/mappingDuration";
import { QueryMovie } from "@/src/shared/types";

export const useMovies = (filters: QueryMovie) => {
  return useQuery({
    queryKey: [
      "movies",
      filters.search || "",
      filters.page || 1,
      filters.type?.toUpperCase() || "",
      filters.genres?.join(",") || "",
      filters.rating ?? "",
      filters.duration ?? "",
    ],

    queryFn: async () => {
      return await getMovies({
        search: filters.search,
        page: filters.page,
        limit: 10,
        type: filters.type?.toUpperCase(),
        genres: filters.genres,
        rating: filters.rating,
        duration: mapDuration(filters.duration),
      });
    },

    placeholderData: (prev) => prev,
  });
};
