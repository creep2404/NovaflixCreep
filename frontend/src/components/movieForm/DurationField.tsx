import { useState } from "react";

export function DurationField({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [manual, setManual] = useState(false);

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h} hours ${m} minutes` : `${m} minutes`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] font-label font-bold uppercase tracking-[0.15em] text-on-surface-variant">DURATION</label>
        <label className="text-[12px] font-label font-bold tracking-[0.15em] text-on-surface-variant cursor-pointer">
          <input
            type="checkbox"
            checked={manual}
            onChange={(e) => setManual(e.target.checked)}
            className="m-2 accent-blue-500 w-3.5 h-3.5"
          />
          Enter manually
        </label>
      </div>

      {!manual ? (
        <div>
          <input
            type="range"
            min={1}
            max={300}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[12px] font-label font-bold tracking-[0.15em] text-on-surface-variant">1 minute</span>
            <span className="text-[13px] font-label font-bold tracking-[0.15em] text-on-surface-varianttext-white">{formatDuration(value)}</span>
            <span className="text-[12px] font-label font-bold tracking-[0.15em] text-on-surface-variant">5 hours</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Hours"
            min={0}
            max={99}
            value={Math.floor(value / 60) || ""}
            onChange={(e) => {
              const h = Number(e.target.value) || 0;
              const m = value % 60;
              onChange(h * 60 + m);
            }}
            className="w-1/2 p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            placeholder="Minutes"
            min={0}
            max={59}
            value={value % 60 || ""}
            onChange={(e) => {
              const m = Number(e.target.value) || 0;
              const h = Math.floor(value / 60);
              onChange(h * 60 + m);
            }}
            className="w-1/2 p-3 rounded bg-gray-800 text-white "
          />
        </div>
      )}
    </div>
  );
}