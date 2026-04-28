import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/src/apis/genre.api";

export const useGenres = (skip: number) => {
  return useQuery({
    queryKey: ["genres", skip],
    queryFn: async () => {
      const res = await getGenres({
        skip,
        limit: 6,
      });
      return res;
    },
  });
};
