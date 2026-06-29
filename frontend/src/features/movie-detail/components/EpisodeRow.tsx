import { Episode } from "@/src/shared/types";
import { EpisodeCardHorizontal } from "./EpisodeCardHorizontal";

interface EpisodeRowProps {
  episodes: Episode[];
  thumbnailUrl: string;
  selectedEpisodeId?: string;
  onSelect: (episode: Episode) => void;
}

export const EpisodeRow = ({
  episodes,
  thumbnailUrl,
  selectedEpisodeId,
  onSelect,
}: EpisodeRowProps) => {
  if (!episodes?.length) return null;

  return (
    <div className="px-8 md:px-16 mb-16">
      <h2 className="text-on-surface text-2xl font-bold mb-4">Episodes</h2>

      <div
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="shrink-0 w-[260px] md:w-[300px] snap-start"
          >
            <EpisodeCardHorizontal
              id={episode.id}
              number={episode.episodeNo}
              title={episode.title}
              description={episode.description}
              duration={episode.durationLabel}
              thumbnailUrl={episode.thumbnailUrl ?? thumbnailUrl}
              active={episode.id === selectedEpisodeId}
              onClick={() => onSelect(episode)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};