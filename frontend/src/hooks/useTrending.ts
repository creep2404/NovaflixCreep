import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../services/movie.service";

export const useTrending = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
    staleTime: 1000 * 60 * 10,
  });
};