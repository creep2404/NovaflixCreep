import { useQuery } from "@tanstack/react-query";
import { getMovieById, getMovieBySlug } from "@/src/apis/movie.api";

export const useMovieDetail = (slug: string) => {
  return useQuery({
    queryKey: ["movie", slug],

    queryFn: async () => {
      const res = await getMovieBySlug(slug!);
      return res;
    },

    enabled: !!slug,
  });
};