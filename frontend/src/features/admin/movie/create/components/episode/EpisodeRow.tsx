import { useState } from "react";
import { Edit2, Check, Trash2 } from "lucide-react";
import { Episode } from "../../hooks/useSeriesForm";

type EpisodeRowProps = {
  index: number;
  episode: Episode;
  onDelete: () => void;
  onEdit: (data: Partial<Episode>) => void;
};

const statusConfig = {
  processed: {
    dot: "bg-tertiary shadow-[0_0_8px_rgba(0,243,185,0.6)]",
    label: "Processed",
  },
  uploading: {
    dot: "bg-surface-variant",
    label: "Uploading...",
  },
  draft: {
    dot: "bg-outline-variant",
    label: "Draft",
  },
};

export function EpisodeRow({
  index,
  episode,
  onDelete,
  onEdit,
}: EpisodeRowProps) {
  const config =
    statusConfig[episode.status] ?? statusConfig.draft;

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(episode.title);
  const [description, setDescription] = useState(
    episode.description ?? "",
  );
  const [duration, setDuration] = useState(
    episode.duration,
  );

  const handleToggleEdit = () => {
    // Enter edit mode
    if (!isEditing) {
      setTitle(episode.title);
      setDescription(episode.description ?? "");
      setDuration(episode.duration);
      setIsEditing(true);
      return;
    }

    // Save changes
    onEdit({
      title,
      description,
      duration,
    });

    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-12 px-4 py-4 bg-surface-container items-center rounded-lg group hover:bg-surface-variant transition-colors gap-3">
      {/* Index */}
      <div className="col-span-1 font-bold text-on-surface-variant">
        {String(index).padStart(2, "0")}
      </div>

      {/* Title */}
      <div className="col-span-2">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-surface-container-highest rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50"
          />
        ) : (
          <div
            className="font-semibold truncate"
            title={episode.title}
          >
            {episode.title}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="col-span-4">
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={2}
            className="w-full bg-surface-container-highest rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-primary/50"
          />
        ) : (
          <div className="relative group/description">
            <div className="font-semibold truncate">
              {episode.description}
            </div>

            <div
              className="absolute left-0 top-full z-50 mt-2 hidden 
                         max-w-[min(320px,calc(100vw-32px))] 
                         whitespace-normal break-words rounded-lg 
                         bg-black px-3 py-2 text-sm text-white shadow-lg 
                         group-hover/description:block"
            >
              {episode.description}
            </div>
          </div>
        )}
      </div>

      {/* Duration */}
      <div className="col-span-1">
        {isEditing ? (
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) =>
              setDuration(Number(e.target.value))
            }
            className="w-full bg-surface-container-highest rounded-lg px-2 py-2 text-sm text-center outline-none focus:ring-1 focus:ring-primary/50"
          />
        ) : (
          <div className="font-semibold">
            {episode.duration} min
          </div>
        )}
      </div>

      {/* File */}
      <div className="col-span-2 relative group/file">
        <div className="font-semibold truncate">
          {episode.file?.name}
        </div>

        <div
          className="absolute left-0 top-full z-50 mt-2 hidden 
                     max-w-[min(320px,calc(100vw-32px))]
                     whitespace-normal break-all rounded-lg 
                     bg-black px-3 py-2 text-sm text-white shadow-lg 
                     group-hover/file:block"
        >
          {episode.file?.name}
        </div>
      </div>

      {/* Status */}
      <div className="col-span-1 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${config.dot}`}
        />

        <span className="text-sm truncate">
          {config.label}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-1 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleToggleEdit}
          className={`transition-colors ${
            isEditing
              ? "text-tertiary hover:text-tertiary/80"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          {isEditing ? (
            <Check size={18} />
          ) : (
            <Edit2 size={18} />
          )}
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="text-on-surface-variant hover:text-error transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}