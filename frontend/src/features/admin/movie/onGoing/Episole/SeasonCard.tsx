import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";

import { AddEpisodeForm } from "./AddEpisodeForm";
import { Episode, NewEpisode, Season } from "../HookGoing/useSeriesForm";
import { EpisodeRow } from "./EpisodeRow";

type SeasonCardProps = {
  season: Season;
  index: number;
  removeSeason: (seasonId: string) => void;
  addEpisode: (seasonId: string, episode: NewEpisode) => void;
  removeEpisode: (seasonId: string, episodeId: string) => void;
  updateEpisode: (
    seasonId: string,
    episodeId: string,
    data: Partial<Episode>,
  ) => void;
};
export function SeasonCard({
  season,
  index,
  removeSeason,
  addEpisode,
  removeEpisode,
  updateEpisode,
}: SeasonCardProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden">
      {/* HEADER */}
      <div
        className="p-6 bg-surface-container-high flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-6">
          <h3 className="text-lg font-bold"> {season.title} </h3>
          {index === 0 && (
            <span className="text-xs font-bold bg-tertiary/20 text-tertiary px-2 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeSeason(season.id);
            }}
            className="text-on-surface-variant hover:text-error transition-colors"
          >
            <Trash2 size={18} />
          </button>
          {expanded ? (
            <ChevronUp className="text-on-surface-variant" size={20} />
          ) : (
            <ChevronDown className="text-on-surface-variant" size={20} />
          )}
        </div>
      </div>
      {/* CONTENT */}
      {expanded && (
        <div className="p-8 space-y-6">
          {/* TABLE */}
          <div className="space-y-1">
            <div className="grid grid-cols-12 px-4 py-2 text-xs font-bold text-outline-variant uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Title</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-1">Duration</div>
              <div className="col-span-2">File</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            {season.episodes.map((episode, episodeIndex) => (
              <EpisodeRow
                key={episode.id}
                index={episodeIndex + 1}
                episode={episode}
                onDelete={() => removeEpisode(season.id, episode.id)}
                onEdit={(data) => updateEpisode(season.id, episode.id, data)}
              />
            ))}
          </div>
          {/* ADD FORM */}
          <AddEpisodeForm seasonId={season.id} addEpisode={addEpisode} />
        </div>
      )}
    </div>
  );
}
