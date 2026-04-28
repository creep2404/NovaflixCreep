import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { getYoutubeId } from "@/src/features/movie-detail/utils/youtube";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
}

export default function TrailerModal({
  isOpen,
  onClose,
  trailerUrl,
}: TrailerModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  let trailerId;
  if (trailerUrl) {
    trailerId = getYoutubeId(trailerUrl);
    console.log(`https://www.youtube.com/embed/${trailerId}?autoplay=1:`);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-4xl aspect-video bg-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-xl hover:cursor-pointer"
        >
          <X size={36} />
        </button>

        {/* YouTube iframe */}
        {trailerId && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );

  //  return (
  //   <dialog
  //     ref={dialogRef}
  //     className="bg-transparent backdrop:bg-black/90 p-0 m-0 w-screen h-screen max-w-full max-h-full"
  //   >
  //     <div className="w-full h-full flex items-center justify-center relative p-8 md:p-20">
  //       <button
  //         onClick={onClose}
  //         className="absolute top-8 right-8 text-white hover:text-primary-fixed transition-colors"
  //       >
  //         <X size={36} />
  //       </button>
  //       <div className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
  //         <video ref={videoRef} className="w-full h-full" controls>
  //           <source src={trailerUrl} type="video/mp4" />
  //           Your browser does not support the video tag.
  //         </video>
  //       </div>
  //     </div>
  //   </dialog>
  // );
}
