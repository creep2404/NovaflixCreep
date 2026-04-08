import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../apis/movie.api";

export const useMovies =(filters: {
  search?: string;
  page?: number;
  genres?: string[];
  rating?: number | null;
  duration?: string | null;
}) => {
  return useQuery({
    queryKey: ["movies", filters],

    queryFn: async () => {
      const res = await getMovies({
        search: filters.search,
        page: filters.page,
        limit: 10,
        genres: filters.genres,
        rating: filters.rating,
        duration: filters.duration,
      });
      return res || [];
    },
    placeholderData: (prev) => prev,
  });
};
