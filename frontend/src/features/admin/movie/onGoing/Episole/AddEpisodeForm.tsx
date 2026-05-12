import { CloudUpload, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Episode } from "../HookGoing/useSeriesForm";
import { VideoDropzone } from "../VideoDropzone";

type Props = {
  seasonId: string;

  addEpisode: (
    seasonId: string,
    episode: Omit<Episode, "id" | "status">,
  ) => void;
};

export function AddEpisodeForm({ seasonId, addEpisode }: Props) {
  const [title, setTitle] = useState("");

  const [duration, setDuration] = useState(45);

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [description, setDescription] = useState("");

  const handleAddEpisode = () => {
    if (!title || !videoFile) return;

    addEpisode(seasonId, {
      title: title.trim(),
      description: description.trim(),
      duration,
      file: videoFile,
      progress: 0,
    });

    setTitle("");
    setDuration(45);
    setVideoFile(null);
    setDescription("");
  };

  return (
    <div className="mt-12 bg-surface-container-highest/30 p-8 rounded-xl border-2 border-dashed border-outline-variant/20">
      <h4 className="text-sm font-bold mb-6 text-on-surface-variant uppercase tracking-widest">
        Add New Episode
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant">
            Episode Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Episode Title"
            className="w-full bg-surface-container-low border-none rounded-lg p-4 text-sm outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant">
            Duration (Minutes)
          </label>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="120"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 cursor-pointer accent-primary"
            />

            <input
              type="number"
              value={duration}
              readOnly
              className="w-20 bg-surface-container-low border-none rounded-lg p-3 text-sm text-center font-bold text-primary outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-xs font-bold text-on-surface-variant">
            Episode Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-lg p-4 text-sm outline-none focus:ring-1 focus:ring-primary/50 min-h-[120px]"
            placeholder="Episode description..."
          />
        </div>
      </div>

      <VideoDropzone
        id={`episode-upload-${seasonId}`}
        file={videoFile}
        onChange={setVideoFile}
      />

      <button
        onClick={handleAddEpisode}
        className="w-full py-4 bg-primary text-on-primary font-extrabold rounded-lg shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] hover:brightness-110"
      >
        CONFIRM ADD EPISODE
      </button>
    </div>
  );
}
