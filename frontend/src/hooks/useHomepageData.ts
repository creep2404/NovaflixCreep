// hooks/useHomepageData.ts
import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getMoviesByGenre,
  getContinueWatching
} from '../apis/movie.api';

export const useHomepageData = () => {
  const trending = useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const res = await getTrendingMovies();
      console.log("🚀 trending API:", res);
      return res?.data || [];
    },
    staleTime: 1000 * 60 * 5
  });

  const thrillers = useQuery({
    queryKey: ['genre', 'thriller'],
    queryFn: async () => {
      const res = await getMoviesByGenre('thriller');
      console.log("🚀 thriller API:", res);
      return res?.data?.data || [];
    },
    staleTime: 1000 * 60 * 5
  });

  const continueWatching = useQuery({
    queryKey: ['continueWatching'],
    queryFn: async () => {
      const res = await getContinueWatching();
      console.log("🚀 continueWatching API:", res);
      return res?.data?.data || [];
    },
    staleTime: 1000 * 60 * 2
  });

  return {
    trending,
    thrillers,
    continueWatching
  };
};