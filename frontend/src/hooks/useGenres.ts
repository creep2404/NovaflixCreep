import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../apis/genre.api";

export const useGenres = (skip: number) => {
  return useQuery({
    queryKey: ["genres", skip],
    queryFn: async () => {
      const res = await getGenres({
        skip,
        limit: 6,
      });

      return res?.data || {};
    },
    keepPreviousData: true,
  });
};
