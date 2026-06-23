import { ContinueWatchingMovie, Movie } from "@/src/shared/types";
import { HistoryCard } from "./HistorySection/HistoryCard";
import { SectionHeader } from "./HistorySection/SectionHeader";

interface HistorySectionProps {
  histories: ContinueWatchingMovie[];
}

export const HistorySection = ({
  histories,
}: HistorySectionProps) => {
  return (
    <div>
      <SectionHeader title="Jump Back In" />

      <div className="flex flex-col gap-6">
        {histories.map((history) => (
          <HistoryCard
            key={history.id}
            history={history}
          />
        ))}
      </div>
    </div>
  );
};
