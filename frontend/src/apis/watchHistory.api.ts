import { api } from "./axios";

export const getWatchHistory = async (movieId: string) => {
  //const res = await api.get(`/watch-history/${movieId}`);
  const res = {
    data: {
      progress: 0,
    },
  };
  return res.data;
};

export const saveWatchHistory = async (data: {
  movieId: string;
  progress: number;
}) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulated API call to save watch history:", data);
      resolve({ success: true });
    }, 500);
  });
  //return api.post("/watch-history/progress", data);
};