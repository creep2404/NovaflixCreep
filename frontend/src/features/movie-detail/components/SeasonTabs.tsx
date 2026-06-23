import { Season } from "@/src/shared/types";

interface SeasonTabsProps {
  seasons: Season[];
  selectedSeason?: Season;
  onChange: (season: Season) => void;
}

export const SeasonTabs = ({
  seasons,
  selectedSeason,
  onChange,
}: SeasonTabsProps) => {
  return (
    <div className="px-8 md:px-16 mb-6">
      <div
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {seasons.map((season) => {
          const isActive = season.id === selectedSeason?.id;
          return (
            <button
              key={season.id}
              onClick={() => onChange(season)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-primary text-surface"
                    : "bg-surface-high text-on-surface-variant hover:bg-surface-variant"
                }`}
            >
              {season.title ?? `Season ${season.seasonNo}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};