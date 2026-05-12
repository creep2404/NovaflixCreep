import { useState } from "react";

export type EpisodeStatus = "idle" | "uploading" | "processed";

export type Episode = {
  id: string;

  title: string;

  description?: string;

  duration: number;

  file: File | null;

  progress: number;

  status: EpisodeStatus;
};

export type Season = {
  id: string;

  title: string;

  episodes: Episode[];
};

export const useSeriesForm = () => {
  const [seasons, setSeasons] = useState<Season[]>([
    {
      id: crypto.randomUUID(),

      title: "Season 1",

      episodes: [],
    },
  ]);

  const addSeason = () => {
    setSeasons((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),

        title: `Season ${prev.length + 1}`,

        episodes: [],
      },
    ]);
  };

  const removeSeason = (seasonId: string) => {
    setSeasons((prev) => prev.filter((season) => season.id !== seasonId));
  };

  const addEpisode = (
    seasonId: string,
    episode: Omit<Episode, "id" | "status">,
  ) => {
    setSeasons((prev) =>
      prev.map((season) => {
        if (season.id !== seasonId) return season;

        return {
          ...season,
          episodes: [
            ...season.episodes,
            {
              id: crypto.randomUUID(),
              status: "idle",
              ...episode, 
            },
          ],
        };
      }),
    );
  };

  const removeEpisode = (seasonId: string, episodeId: string) => {
    setSeasons((prev) =>
      prev.map((season) => {
        if (season.id !== seasonId) {
          return season;
        }

        return {
          ...season,

          episodes: season.episodes.filter(
            (episode) => episode.id !== episodeId,
          ),
        };
      }),
    );
  };

  const updateEpisode = (
    seasonId: string,
    episodeId: string,
    data: Partial<Episode>,
  ) => {
    setSeasons((prev) =>
      prev.map((season) => {
        if (season.id !== seasonId) {
          return season;
        }

        return {
          ...season,

          episodes: season.episodes.map((episode) => {
            if (episode.id !== episodeId) {
              return episode;
            }

            return {
              ...episode,
              ...data,
            };
          }),
        };
      }),
    );
  };

  return {
    seasons,
    setSeasons,

    addSeason,
    removeSeason,

    addEpisode,
    removeEpisode,

    updateEpisode,
  };
};
