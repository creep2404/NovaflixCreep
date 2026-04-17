import { useQuery } from "@tanstack/react-query";
import { getSuggestMovies } from "@/src/apis/movie.api";

export const useSuggest = (search: string) => {
  return useQuery({
    queryKey: ["suggest", search],
    queryFn: () => getSuggestMovies(search),
    enabled: !!search, // only call when inputted
  });
};