import { SeasonNew } from "@/src/shared/types";

interface SeasonTabsProps {
  seasons: SeasonNew[];
  selectedSeason?: SeasonNew;
  onChange: (season: SeasonNew) => void;
}

export const SeasonTabs = ({
  seasons,
  selectedSeason,
  onChange,
}: SeasonTabsProps) => {
  if (!seasons?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {seasons.map((season) => {
        const isActive = season.id === selectedSeason?.id;

        return (
          <button
            key={season.id}
            onClick={() => onChange(season)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${
                isActive
                  ? "bg-primary text-surface"
                  : "bg-surface-variant/40 text-on-surface hover:bg-surface-variant/60"
              }
            `}
          >
            Season {season.seasonNo}
          </button>
        );
      })}
    </div>
  );
};