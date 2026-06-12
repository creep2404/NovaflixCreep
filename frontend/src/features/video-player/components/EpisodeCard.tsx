import { Play } from "lucide-react";

interface EpisodeCardProps {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: number | string;
  thumbnailUrl: string;
  active?: boolean;
  onClick?: () => void;
}

export function EpisodeCard({
  number,
  title,
  description,
  duration,
  thumbnailUrl,
  active = false,
  onClick,
}: EpisodeCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-6 p-4 rounded-xl transition-colors cursor-pointer ${
        active
          ? "bg-surface-high border border-primary/20"
          : "hover:bg-surface-high/50 border border-transparent"
      }`}
    >
      <div className="text-2xl font-headline font-bold text-on-surface-variant/50 w-8 flex items-center justify-center">
        {number}
      </div>

      <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 group">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={24} className="text-white fill-current" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg truncate pr-4">{title}</h3>

          <span className="text-sm text-on-surface-variant">
            {duration}
          </span>
        </div>

        <p className="text-sm text-on-surface-variant line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}