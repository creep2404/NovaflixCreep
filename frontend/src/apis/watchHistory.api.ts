import { api } from "./axios";

export interface WatchHistory {
  progress: number;
  episode: {
    episodeId: string;
    episodeNo: number;
    seasonNo: number;
  };
}

export interface UpdateProgressPayload {
  movieId: string;
  episodeId: string;
  progress: number;
}

export const getWatchHistory = async (movieId: string) =>
{
  const res = await api.get<WatchHistory>(`/watch-history/${movieId}`);
  //console.log("Fetched watch history:", res);
  return res;
}

export const saveWatchHistory = async (data: UpdateProgressPayload) =>
{
  console.log("Saving watch history with data:", data);
  return await api.post("/watch-history/progress", data);
}
 