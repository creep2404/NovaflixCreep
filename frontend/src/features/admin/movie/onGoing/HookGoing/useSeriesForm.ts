import { useState } from "react";

export type EpisodeStatus = "idle" | "uploading" | "processed";
export type NewEpisode = Omit<Episode, "id" | "status" | "episodeNo">;

export type Episode = {
  id: string;
  episodeNo: number;
  title: string;
  description?: string;
  duration: number;
  file: File | null;
  progress: number;
  status: EpisodeStatus;
};

export type Season = {
  id: string;
  seasonNo: number;
  title: string;
  episodes: Episode[];
};

const initialSeasons: Season[] = [
  {
    id: crypto.randomUUID(),
    seasonNo: 1,
    title: "Tam thoi Season 1",
    episodes: [],
  },
];

export const useSeriesForm = () => {
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons);

  const addSeason = () => {
    setSeasons((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        seasonNo: prev.length + 1,
        title: `Tam thoi Season ${prev.length + 1}`,
        episodes: [],
      },
    ]);
  };

  const removeSeason = (seasonId: string) => {
    setSeasons((prev) => prev.filter((season) => season.id !== seasonId));
  };

  const addEpisode = (
    seasonId: string,
    episode: NewEpisode,
  ) => {
    setSeasons((prev) =>
      prev.map((season) => {
        if (season.id !== seasonId) return season;

        const newEpisode: Episode = {
          ...episode,
          id: crypto.randomUUID(),
          status: "idle",
          episodeNo: season.episodes.length + 1,
        };

        return {
          ...season,
          episodes: [...season.episodes, newEpisode],
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

  const resetSeries = () => {
  setSeasons(initialSeasons);
};

  return {
    seasons,
    setSeasons,

    addSeason,
    removeSeason,

    addEpisode,
    removeEpisode,

    updateEpisode,

    resetSeries,
  };
};
