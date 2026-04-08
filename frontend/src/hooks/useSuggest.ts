import { useQuery } from "@tanstack/react-query";
import { getSuggestMovies } from "../services/movie.service";
export const useSuggest = (search: string) => {
  return useQuery({
    queryKey: ["suggest", search],
    queryFn: () => getSuggestMovies(search),
    enabled: !!search, // chỉ call khi có input
  });
};