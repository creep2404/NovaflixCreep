import { MoviePlayback } from "../shared/types";
import { api } from "./axios";

export const getEpisodePlaybackData = (id: string) =>
  api.get<MoviePlayback>(`/episodes/${id}/play`);