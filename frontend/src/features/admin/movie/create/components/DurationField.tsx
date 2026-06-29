import { Calendar } from "lucide-react";
import { useRef } from "react";

type ReleaseDateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ReleaseDateField({ value, onChange }: ReleaseDateFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-container-highest border-none rounded-lg p-4 pr-12 text-on-surface placeholder:text-outline-variant/50 appearance-none outline-none focus:ring-1 focus:ring-primary/50 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />

        <Calendar
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
          size={20}
          onClick={() => inputRef.current?.showPicker?.()}
        />
      </div>
    </div>
  );
}
