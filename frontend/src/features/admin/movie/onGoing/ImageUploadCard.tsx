import { LucideIcon } from "lucide-react";
import { useRef } from "react";

type ImageUploadCardProps = {
  label: string;
  image: string;
  onChange: (payload: ImageUploadPayload) => void;
  aspect: string;
  icon: LucideIcon;
  actionText: string;
};

type ImageUploadPayload = {
  file: File;
  previewUrl: string;
};

export function ImageUploadCard({
  label,
  image,
  onChange,
  aspect,
  icon: Icon,
  actionText,
}: ImageUploadCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    onChange({ file, previewUrl });
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-on-surface-variant px-1">
        {label}
      </label>

      <div
        className={`relative ${aspect} bg-surface-container-highest rounded-xl overflow-hidden group cursor-pointer`}
        onClick={() => inputRef.current?.click()}
      >
        <img
          src={image}
          className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
          alt={label}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Icon size={36} className="text-primary" />

          <p className="text-sm font-medium text-on-surface-variant">
            {actionText}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}