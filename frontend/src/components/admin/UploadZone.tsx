import { UploadCloud } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  onFileSelect: (file: File) => void;
  progress: number;
  fileName?: string;
};

export function UploadZone({ onFileSelect, progress, fileName }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    onFileSelect(file);
    console.log("File selected:", file);
  };

  return (
    <div className="lg:col-span-7 space-y-6">
      <div
        className="relative group cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="video/*"
          onChange={(e) => handleFile(e.target.files?.[0]!)}
        />

        <div className="w-full aspect-video rounded-3xl bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-12 transition-all group-hover:border-primary-fixed/50 group-hover:bg-surface-container-low/50">
          <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-xl">
            <UploadCloud className="w-10 h-10 text-primary-fixed" />
          </div>

          <h3 className="text-xl font-poppins font-bold text-white mb-2">
            Drop movie master here
          </h3>

          <p className="text-on-surface-variant text-sm text-center max-w-xs mb-8">
            Support for 4K ProRes, H.265, and AV1. Maximum file size 50GB.
          </p>

          {fileName && (
            <div className="w-full max-w-md space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                <span>{fileName}</span>
                <span className="text-primary-fixed">{progress}%</span>
              </div>

              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-fixed transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}