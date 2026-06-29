import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavoriteApi,
  removeFavoriteApi,
  getMyFavoritesApi,
  getFavoriteStatusApi,
} from "@/src/apis/favorite.api";

const QUERY_KEYS = {
  FAVORITES: ["favorites"],
  FAVORITE_STATUS: ["favoriteStatus"],
};

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FAVORITES,
    queryFn: getMyFavoritesApi,
  });
};

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addFavoriteApi,
    onSuccess: (_, movieId) => {
      queryClient.setQueryData([...QUERY_KEYS.FAVORITE_STATUS, movieId], {
        isFavorite: true,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavoriteApi,
    onSuccess: (_, movieId) => {
      queryClient.setQueryData([...QUERY_KEYS.FAVORITE_STATUS, movieId], {
        isFavorite: false,
      });
    },
  });

  return {
    addFavorite: addMutation.mutateAsync,
    removeFavorite: removeMutation.mutateAsync,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};

export const useFavoriteStatus = (movieId: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.FAVORITE_STATUS, movieId],
    queryFn: () => getFavoriteStatusApi(movieId),
    enabled: !!movieId,
  });
};
