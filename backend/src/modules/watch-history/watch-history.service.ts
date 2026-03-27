import { UpdateProgressDto } from "./dto/update-progress.dto";
import {
  upsertWatchHistoryRepo,
  getWatchHistoryRepo,
} from "./watch-history.repository";
import { formatWatchHistory } from "./mappers/watch-history.mapper";

export const updateProgressService = async (
  userId: string,
  data: UpdateProgressDto
) => {
  const record = await upsertWatchHistoryRepo({
    userId,
    movieId: data.movieId,
    progress: data.progress,
  });

  return record;
};

export const getWatchHistoryService = async (userId: string) => {
  const history = await getWatchHistoryRepo(userId);

  return history.map(formatWatchHistory);
};