import { useState } from "react";

export function ReleaseDateField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [yearOnly, setYearOnly] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) =>
    String(currentYear - i)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] font-label font-bold tracking-[0.15em] text-on-surface-variant">Release Date</label>
        <label className="text-[12px] font-label font-bold tracking-[0.15em] text-on-surface-variant cursor-pointer">
          <input
            type="checkbox"
            checked={yearOnly}
            onChange={(e) => {
              setYearOnly(e.target.checked);
              onChange(""); // reset when toggling
            }}
            className="m-2 accent-blue-500 w-3.5 h-3.5"
          />
          Year only
        </label>
      </div>

      {!yearOnly ? (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white "
        >
          <option value="" >-- Select Year --</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      )}
    </div>
  );
}