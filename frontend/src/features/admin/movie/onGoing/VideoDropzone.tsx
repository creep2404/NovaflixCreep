import { CloudUpload, PlayCircle } from "lucide-react";

type Props = {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
};

export function VideoDropzone({ id, file, onChange }: Props) {
  const handleFile = (f: File | null) => {
    onChange(f);
  };

  return (
    <div className="space-y-3 mb-8">
      <label
        htmlFor={id}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0] ?? null;
          if (dropped) handleFile(dropped);
        }}
        className="border-2 border-dashed border-outline-variant/30 rounded-xl p-10 bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center justify-center gap-4 cursor-pointer group"
      >
        {/* INPUT FILE — FIX QUAN TRỌNG */}
        <input
          id={id}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null;
            handleFile(selected);

            // FIX: allow re-select same file
            e.target.value = "";
          }}
        />

        {/* ICON */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
            file ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"
          }`}
        >
          {file ? <PlayCircle size={32} /> : <CloudUpload size={32} />}
        </div>

        {/* TEXT */}
        <div className="text-center">
          <p className="text-on-surface font-bold">
            {file ? "File selected" : "Drag and drop your video file here"}
          </p>

          <p className="text-on-surface-variant text-sm mt-1">
            {file ? (
              <span className="text-primary font-semibold break-all">
                {file.name}
              </span>
            ) : (
              "Supports MP4, MKV, MOV (Max 5GB)"
            )}
          </p>
        </div>

        {/* ACTION */}
        {!file ? (
          <div className="mt-2 px-6 py-2 bg-surface-variant text-on-surface rounded-full text-xs font-bold">
            Or Select File
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFile(null);
            }}
            className="mt-2 px-6 py-2 bg-error/10 text-error rounded-full text-xs font-bold hover:bg-error/20 transition"
          >
            Remove File
          </button>
        )}
      </label>
    </div>
  );
}