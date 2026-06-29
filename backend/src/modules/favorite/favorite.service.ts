import { signMovieThumbnail } from "@/common/utils/movie.helper";
import { formatMovie } from "../movie/mappers/movie.mapper";
import {
  createFavoriteRepo,
  deleteFavoriteRepo,
  getFavoriteRepo,
  getMyFavoritesRepo,
} from "./favorite.repository";

export const addFavoriteService = async (userId: string, movieId: string) => {
  const existed = await getFavoriteRepo({ userId, movieId });

  if (existed) {
    return {
      isFavorite: true,
    };
  }

  await createFavoriteRepo({ userId, movieId });

  return {
    isFavorite: true,
  };
};

export const removeFavoriteService = async (
  userId: string,
  movieId: string,
) => {
  const existed = await getFavoriteRepo({ userId, movieId });

  if (!existed) {
    return {
      isFavorite: false,
    };
  }

  await deleteFavoriteRepo({ userId, movieId });

  return {
    isFavorite: false,
  };
};

export const getFavoriteStatusService = async (
  userId: string,
  movieId: string,
) => {
  const favorite = await getFavoriteRepo({ userId, movieId });

  return {
    isFavorite: !!favorite,
  };
};

export const getMyFavoritesService = async (userId: string) => {
  const favorites = await getMyFavoritesRepo(userId);

  const signedFavorites = await Promise.all(
    favorites.map(async (item) => ({
      ...item,
      movie: await signMovieThumbnail(item.movie),
    })),
  );

  return signedFavorites.map((item) => formatMovie(item.movie));
};