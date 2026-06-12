import { prisma } from "@/database/client";
import { CreateEpisodeRepoInput, UpdateEpisodeRepoInput } from "./episode.type";
import { buildPrismaUpdate } from "@/common/utils/object.util";

export const createEpisodeRepo = async (data: CreateEpisodeRepoInput) => {
  return prisma.episode.create({
    data: {
      movieId: data.movieId,
      title: data.title,
      videoId: data.videoId,
      duration: data.duration,
      episodeNo: data.episodeNo,
      description: data.description,
    },

    include: {
      movie: true,
    },
  });
};

export const updateEpisodeRepo = async (
  id: string,
  data: UpdateEpisodeRepoInput,
) => {
  return prisma.episode.update({
    where: {
      id,
    },
    data: buildPrismaUpdate(data),

    include: {
      movie: true,
    },
  });
};

export const deleteEpisodeRepo = async (id: string) => {
  return prisma.episode.delete({
    where: {
      id,
    },
  });
};

export const checkExistingEpisode = async (
  movieId: string,
  episodeNo: number,
) => {
  return await prisma.episode.findFirst({
    where: {
      movieId,
      episodeNo,
    },
  });
};

export const checkDuplicateEpisode = async (
  id: string,
  movieId: string,
  episodeNo: number,
) => {
  return await prisma.episode.findFirst({
    where: {
      movieId: movieId,

      episodeNo: episodeNo,

      NOT: {
        id,
      },
    },
  });
};

export const getEpisodeByIdRepo = async (id: string) => {
  return await prisma.episode.findUnique({
    where: {
      id,
    },
  });
};

export const getEpisodeWithMovieEpisodesRepo = async (id: string) => {
  return prisma.episode.findUnique({
    where: {
      id,
    },

    include: {
      movie: {
        include: {
          episodes: true,
        },
      },
    },
  });
};

export const getEpisodeByIdWithMovieRepo = async (id: string) => {
  return prisma.episode.findUnique({
    where: {
      id,
    },

    include: {
      movie: true,
    },
  });
};

export const getNextEpisodeRepo = async (
  movieId: string,
  episodeNo: number,
) => {
  return prisma.episode.findFirst({
    where: {
      movieId,
      episodeNo: {
        gt: episodeNo,
      },
    },

    orderBy: {
      episodeNo: "asc",
    },
  });
};

export const getEpisodeVideoIdByIdRepo = async (
  episodeId: string,
): Promise<string> => {
  const episode = await prisma.episode.findUniqueOrThrow({
    select: {
      videoId: true,
    },
    where: {
      id: episodeId,
    },
  });

  return episode.videoId;
};