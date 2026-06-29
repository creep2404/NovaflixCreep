import { AppError } from "@/common/utils/AppError";
import {
  getEpisodeByIdRepo,
  getNextEpisodeRepo,
} from "./episode.repositoy";

// export const createEpisodeService = async (data: CreateEpisodeInput) => {
//   if (data.duration <= 0) {
//     throw new AppError("Invalid duration", 400);
//   }

//   if (!data.videoId) {
//     throw new AppError("Video is required", 400);
//   }

//   if (!data.description || data.description.length < 3) {
//     throw new AppError("Description too short", 400);
//   }

//   // Check duplicate episode number
//   const existingEpisode = await checkExistingEpisode(
//     data.movieId,
//     data.episodeNo,
//   );

//   if (existingEpisode) {
//     throw new AppError("Episode number already exists", 400);
//   }

//   const episode = await createEpisodeRepo(data);

//   await invalidateMovieCache();

//   return episode;
// };

// export const updateEpisodeService = async (
//   id: string,
//   data: UpdateEpisodeRepoInput,
// ) => {
//   if (data.duration !== undefined && data.duration <= 0) {
//     throw new AppError("Invalid duration", 400);
//   }

//   if (data.description && data.description.length < 3) {
//     throw new AppError("Description too short", 400);
//   }

//   // Check duplicate episodeNo
//   if (data.episodeNo !== undefined) {
//     const currentEpisode = await getEpisodeByIdRepo(id);

//     if (!currentEpisode) {
//       throw new AppError("Episode not found", 404);
//     }

//     const duplicateEpisode = await checkDuplicateEpisode(
//       id,
//       currentEpisode.movieId,
//       data.episodeNo,
//     );

//     if (duplicateEpisode) {
//       throw new AppError("Episode number already exists", 400);
//     }
//   }

//   const updated = await updateEpisodeRepo(id, data);

//   await invalidateMovieCache();

//   return updated;
// };

// export const deleteEpisodeService = async (id: string) => {
//   const episode = await getEpisodeWithMovieEpisodesRepo(id);

//   if (!episode) {
//     throw new AppError("Episode not found", 404);
//   }

//   const totalEpisodes = episode.movie.episodes.length;

//   if (totalEpisodes <= 1) {
//     throw new AppError("Movie must contain at least one episode", 400);
//   }

//   await deleteEpisodeRepo(id);

//   await invalidateMovieCache();

//   return {
//     success: true,
//   };
// };

// service

export const getNextEpisodeService = async (episodeId: string) => {
  const currentEpisode = await getEpisodeByIdRepo(episodeId);

  if (!currentEpisode) {
    throw new AppError("Episode not found", 404);
  }

  const nextEpisode = await getNextEpisodeRepo(
    currentEpisode.episodeNo,
  );

  return nextEpisode;
};
