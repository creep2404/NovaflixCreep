import { useEffect, useRef } from "react";

export const SearchDropdown = ({ onClose }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute w-full mt-2 bg-surface-high rounded-xl p-4 z-50"
    >
      <p className="text-sm text-gray-400">Suggestions...</p>
    </div>
  );
};