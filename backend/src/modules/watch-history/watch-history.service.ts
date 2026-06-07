import { UpdateProgressDto } from "./dto/update-progress.dto";
import {
  upsertWatchHistoryRepo,
  getWatchHistoryByMovieRepo,
} from "./watch-history.repository";

export const updateProgressService = async (
  userId: string,
  data: UpdateProgressDto,
) => {
  const record = await upsertWatchHistoryRepo({
    userId,
    movieId: data.movieId,
    episodeId: data.episodeId,
    progress: data.progress,
  });

  return record;
};

export const getWatchHistoryByMovieService = async (
  userId: string,
  movieId: string,
) => {
  const history = await getWatchHistoryByMovieRepo(userId, movieId);

  if (!history) return null;

  return {
    progress: history.progress,
    episodeId: history.episodeId,
    episodeNo: history.episode.episodeNo,
  };
};
