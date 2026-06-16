import { Layers, Plus } from "lucide-react";

import { SeasonCard } from "./SeasonCard";
import { Episode, NewEpisode, Season } from "../../hooks/useSeriesForm";

type Props = {
  seasons: Season[];

  addSeason: () => void;

  removeSeason: (
    seasonId: string,
  ) => void;

  addEpisode: (
    seasonId: string,
    episode: NewEpisode,
  ) => void;

  removeEpisode: (
    seasonId: string,
    episodeId: string,
  ) => void;

  updateEpisode: (
    seasonId: string,
    episodeId: string,
    data: Partial<Episode>,
  ) => void;
};

export function EpisodeManagementSection({
  seasons,

  addSeason,

  removeSeason,

  addEpisode,
  removeEpisode,

  updateEpisode,
}: Props) {
  return (
    <section className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Layers
            className="text-primary"
            size={24}
          />

          <h2 className="text-xl font-bold tracking-tight">
            Episode Management
          </h2>
        </div>

        <button
          onClick={addSeason}
          className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity"
        >
          <Plus size={20} />

          Add Season
        </button>
      </div>

      {/* SEASONS */}

      <div className="space-y-6">
        {seasons.map((season, index) => (
          <SeasonCard
            key={season.id}

            season={season}

            index={index}

            removeSeason={removeSeason}

            addEpisode={addEpisode}

            removeEpisode={removeEpisode}

            updateEpisode={updateEpisode}
          />
        ))}
      </div>
    </section>
  );
}

