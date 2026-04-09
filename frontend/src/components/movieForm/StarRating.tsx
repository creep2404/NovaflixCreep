import { useState } from "react";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  const getStarValue = (
    e: React.MouseEvent<SVGSVGElement>,
    starIndex: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const starWidth = rect.width / 5;
    const localX = e.clientX - rect.left - starIndex * starWidth;
    return localX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const starWidth = rect.width / 5;
    const starIndex = Math.floor((e.clientX - rect.left) / starWidth);
    const localX = e.clientX - rect.left - starIndex * starWidth;
    setHovered(localX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1);
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const starWidth = rect.width / 5;
    const starIndex = Math.floor((e.clientX - rect.left) / starWidth);
    const localX = e.clientX - rect.left - starIndex * starWidth;
    onChange(localX < starWidth / 2 ? starIndex + 0.5 : starIndex + 1);
  };

  const starPath =
    "M10 1L12.5 6.5L18.5 7.4L14.2 11.5L15.3 17.5L10 14.6L4.7 17.5L5.8 11.5L1.5 7.4L7.5 6.5Z";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[13px] font-label font-bold tracking-[0.15em] text-on-surface-variant">Rating</label>
        <span className="text-[12px] font-label font-bold tracking-[0.15em] text-on-surface-variant text-white">
          {active > 0 ? `${active} / 5 stars` : "Not selected"}
        </span>
      </div>

      <svg
        width="180"
        height="36"
        viewBox="0 0 180 36"
        className="cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(0)}
        onClick={handleClick}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const x = i * 36;
          const isFull = active >= i + 1;
          const isHalf = !isFull && active >= i + 0.5;

          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              {/* Empty star */}
              <path
                d={starPath}
                fill="#374151"
                stroke="#4B5563"
                strokeWidth="0.5"
              />

              {/* Full or half fill */}
              {isFull && (
                <path
                  d={starPath}
                  fill="#F59E0B"
                  stroke="#D97706"
                  strokeWidth="0.5"
                />
              )}
              {isHalf && (
                <path
                  d={starPath}
                  fill="#F59E0B"
                  stroke="#D97706"
                  strokeWidth="0.5"
                  clipPath={`inset(0 50% 0 0)`}
                />
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-gray-500 mt-1">
        Hover to see half stars • Click to select
      </p>
    </div>
  );
}