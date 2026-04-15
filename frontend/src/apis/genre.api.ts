import { api } from "./axios";
import { QueryGenre } from "../common/types";

export const getGenres = async (params: QueryGenre) =>
  await api.get("/genres", { params });
