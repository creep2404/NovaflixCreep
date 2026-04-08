import { api } from "./axios";
import { QueryGenre } from "../types";


export const getGenres = async (params: QueryGenre) => {
  const res = await api.get("/genres", { params });
  return res.data;
};