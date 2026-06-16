import { Star } from "lucide-react";
import { useState } from "react";

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function RatingInput({
  value,
  onChange,
}: RatingInputProps) {
  const [hovered, setHovered] = useState(0);

  const active = hovered || value;

  const getStarValue = (
    e: React.MouseEvent<HTMLDivElement>,
    starIndex: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;

    return localX < rect.width / 2 ? starIndex + 0.5 : starIndex + 1;
  };

  return (
    <div>
      <label className="text-sm font-semibold text-on-surface-variant px-1">
        Rating
      </label>

      <div className="bg-surface-container-highest p-4 rounded-lg flex items-center gap-2 h-[60px]">
        {[0, 1, 2, 3, 4].map((i) => {
          const isFull = active >= i + 1;
          const isHalf = !isFull && active >= i + 0.5;

          return (
            <div
              key={i}
              className="relative cursor-pointer"
              onMouseMove={(e) =>
                setHovered(getStarValue(e, i))
              }
              onMouseLeave={() => setHovered(0)}
              onClick={(e) =>
                onChange(getStarValue(e, i))
              }
            >
              {/* Empty star */}
              <Star
                className="text-outline-variant"
                size={24}
              />

              {/* Full star */}
              {isFull && (
                <Star
                  className="absolute inset-0 text-[#ffd165] fill-[#ffd165]"
                  size={24}
                />
              )}

              {/* Half star */}
              {isHalf && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    className="text-[#ffd165] fill-[#ffd165]"
                    size={24}
                  />
                </div>
              )}
            </div>
          );
        })}

        <span className="ml-2 text-sm text-on-surface-variant font-bold">
          {active > 0
            ? `${active.toFixed(1)}/5.0`
            : "0.0/5.0"}
        </span>
      </div>
    </div>
  );
}