import { PlayCircle } from "lucide-react";

type TrailerUrlFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TrailerUrlField({
  value,
  onChange,
}: TrailerUrlFieldProps) {
  return (
    <div className="space-y-2 pt-4">
      <label className="text-sm font-semibold text-on-surface-variant px-1">
        YouTube Trailer URL
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full bg-surface-container-highest border-none rounded-lg p-4 pl-12 text-on-surface placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary/50 outline-none"
        />

        <PlayCircle
          className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
          size={20}
        />
      </div>
    </div>
  );
}