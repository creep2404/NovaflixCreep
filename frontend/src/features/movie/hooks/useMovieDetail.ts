import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/src/apis/movie.api";

export const useMovieDetail = (id?: string) => {
  return useQuery({
    queryKey: ["movie", id],

    queryFn: async () => {
      const res = await getMovieById(id!);
      return res;
    },

    enabled: !!id,
  });
};