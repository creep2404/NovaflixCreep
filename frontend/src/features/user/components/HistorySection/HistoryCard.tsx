import { WatchHistory } from "@/src/apis/watchHistory.api";
import { ContinueWatchingMovie } from "@/src/shared/types";
import { MoreVertical, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryCardProps {
  history: ContinueWatchingMovie;
}

export const HistoryCard = ({ history }: HistoryCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 items-center p-4 rounded-2xl bg-surface-high border border-white/5 group cursor-pointer"
      onClick={() => navigate(`/movie/${history.slug}`)}
    >
      <div className="w-32 aspect-video rounded-lg overflow-hidden bg-surface-container-high relative shrink-0">
        <img
          src={history.thumbnailUrl}
          alt={history.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle size={32} className="text-white" />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-primary"
            style={{ width: `${history.progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-bold text-on-surface line-clamp-1">
          {history.title}
        </h4>

        <p className="text-[10px] text-on-surface-variant/60 font-semibold tracking-wide uppercase mt-0.5">
          {history.genres.join(", ")}
        </p>
      </div>

      <button
        onClick={(e) => e.stopPropagation()}
        className="p-2 rounded-full text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors"
      >
        <MoreVertical size={20} />
      </button>
    </div>
  );
};
