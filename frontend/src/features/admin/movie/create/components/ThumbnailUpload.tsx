import { useCallback, useRef, useState, useEffect } from 'react';

export function ThumbnailUpload({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string>('');

  // ✅ tạo preview từ file
  useEffect(() => {
    if (!value) {
      setPreview('');
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    onChange(file); // ✅ giữ file thật
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          relative w-28 h-28 rounded-xl border-2 border-dashed cursor-pointer
          flex flex-col items-center justify-center overflow-hidden
          transition-colors
          ${
            dragging
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-surface-container-high bg-surface-container-high hover:border-blue-400'
          }
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="thumbnail preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-xs text-center leading-tight">
              Drag&Drop or
              <br />
              Click to Upload
            </span>
          </div>
        )}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors mt-2"
        >
          Delete Image
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}