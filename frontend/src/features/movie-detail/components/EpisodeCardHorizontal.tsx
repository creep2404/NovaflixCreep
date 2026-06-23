import { Play } from "lucide-react";

interface EpisodeCardHorizontalProps {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: number | string;
  thumbnailUrl: string;
  active?: boolean;
  onClick?: () => void;
}

export function EpisodeCardHorizontal({
  number,
  title,
  description,
  duration,
  thumbnailUrl,
  active = false,
  onClick,
}: EpisodeCardHorizontalProps) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl p-2 transition-colors ${
        active ? "bg-surface-high" : "hover:bg-surface-high/50"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={28} className="text-white fill-current" />
        </div>

        {/* Episode number badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md">
          EP {number}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          {duration}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <h3 className="font-bold text-base text-on-surface truncate">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}