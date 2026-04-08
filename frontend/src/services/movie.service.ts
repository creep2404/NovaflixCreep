import axios from "axios";

export const getSuggestMovies = async (search: string) => {
  const res = await axios.get("/movies", {
    params: { search, limit: 5 },
  });
  return res.data;
};

export const getTrendingMovies = async () => {
  const res = await axios.get("/movies", {
    params: { limit: 5 }, 
  });
  return res.data;
};