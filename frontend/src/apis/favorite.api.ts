import { api } from "./axios";


export const getMyFavoritesApi = async () => {
  const res = await api.get("/favorites/me");
  console.log("My favorites: ", res);
  return res;
};

export const addFavoriteApi = async (movieId: string) => {
  const res = await api.post(`/favorites/${movieId}`);
  console.log("Add log", res);
  return res;
};

export const removeFavoriteApi = async (movieId: string) => {
  const res = await api.delete(`/favorites/${movieId}`);
  return res;
};

export const getFavoriteStatusApi = async (movieId: string) => {
  const res = await api.get(`/favorites/${movieId}/status`);
  return res;
};