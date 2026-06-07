import { AppError } from "@/common/utils/AppError";
import {
  checkDuplicateEpisode,
  checkExistingEpisode,
  createEpisodeRepo,
  deleteEpisodeRepo,
  getEpisodeByIdRepo,
  getEpisodeByIdWithMovieRepo,
  getEpisodeWithMovieEpisodesRepo,
  getNextEpisodeRepo,
  updateEpisodeRepo,
} from "./episode.repositoy";
import { invalidateMovieCache } from "../movie/movie.cache";
import { CreateEpisodeInput } from "../movie/movie.type";
import { UpdateEpisodeRepoInput } from "./episode.type";
import { getPresignedDownloadUrl } from "@/common/infra/s3-upload.util";
import { FILE_PATHS } from "@/common/constants/file-path.constants";

export const createEpisodeService = async (data: CreateEpisodeInput) => {
  if (data.duration <= 0) {
    throw new AppError("Invalid duration", 400);
  }

  if (!data.videoId) {
    throw new AppError("Video is required", 400);
  }

  if (!data.description || data.description.length < 3) {
    throw new AppError("Description too short", 400);
  }

  // Check duplicate episode number
  const existingEpisode = await checkExistingEpisode(
    data.movieId,
    data.episodeNo,
  );

  if (existingEpisode) {
    throw new AppError("Episode number already exists", 400);
  }

  const episode = await createEpisodeRepo(data);

  await invalidateMovieCache();

  return episode;
};

export const updateEpisodeService = async (
  id: string,
  data: UpdateEpisodeRepoInput,
) => {
  if (data.duration !== undefined && data.duration <= 0) {
    throw new AppError("Invalid duration", 400);
  }

  if (data.description && data.description.length < 3) {
    throw new AppError("Description too short", 400);
  }

  // Check duplicate episodeNo
  if (data.episodeNo !== undefined) {
    const currentEpisode = await getEpisodeByIdRepo(id);

    if (!currentEpisode) {
      throw new AppError("Episode not found", 404);
    }

    const duplicateEpisode = await checkDuplicateEpisode(
      id,
      currentEpisode.movieId,
      data.episodeNo,
    );

    if (duplicateEpisode) {
      throw new AppError("Episode number already exists", 400);
    }
  }

  const updated = await updateEpisodeRepo(id, data);

  await invalidateMovieCache();

  return updated;
};

export const deleteEpisodeService = async (id: string) => {
  const episode = await getEpisodeWithMovieEpisodesRepo(id);

  if (!episode) {
    throw new AppError("Episode not found", 404);
  }

  const totalEpisodes = episode.movie.episodes.length;

  if (totalEpisodes <= 1) {
    throw new AppError("Movie must contain at least one episode", 400);
  }

  await deleteEpisodeRepo(id);

  await invalidateMovieCache();

  return {
    success: true,
  };
};

// service
export const getEpisodePlaybackService = async (episodeId: string) => {
  const episode = await getEpisodeByIdWithMovieRepo(episodeId);

  if (!episode) {
    throw new AppError("Episode not found", 404);
  }

  const key = FILE_PATHS.video(episode.videoId);

  const url = await getPresignedDownloadUrl(key);

  return {
    playbackUrl: url,
    type: "mp4",

    episode: {
      id: episode.id,
      title: episode.title,
      episodeNo: episode.episodeNo,
      duration: episode.duration,
    },

    movie: {
      id: episode.movie.id,
      title: episode.movie.title,
      thumbnailUrl: episode.movie.thumbnailUrl,
    },
  };
};

export const getNextEpisodeService = async (episodeId: string) => {
  const currentEpisode = await getEpisodeByIdRepo(episodeId);

  if (!currentEpisode) {
    throw new AppError("Episode not found", 404);
  }

  const nextEpisode = await getNextEpisodeRepo(
    currentEpisode.movieId,
    currentEpisode.episodeNo,
  );

  return nextEpisode;
};