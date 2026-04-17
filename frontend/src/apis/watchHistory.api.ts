import { api } from "./axios";

export const getWatchHistory = async (movieId: string) =>
  await api.get(`/watch-history/${movieId}`);

export const saveWatchHistory = async (data: {
  movieId: string;
  progress: number;
}) => await api.post("/watch-history/progress", data);
