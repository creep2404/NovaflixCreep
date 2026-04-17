import { api } from "./axios";
import { QueryGenre } from "@/src/shared/types";

export const getGenres = async (params: QueryGenre) =>
  await api.get("/genres", { params });
