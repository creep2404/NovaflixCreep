import { useEffect } from "react";

export const useKeyboardShortcuts = ({
  videoRef,
  setIsPlaying,
  setVolume,
  setIsMuted,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  setIsPlaying: (v: any) => void;
  setVolume: (v: any) => void;
  setIsMuted: (v: boolean) => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          setIsPlaying((prev: boolean) => !prev);
          break;

        case "ArrowRight":
          video.currentTime += 5;
          break;

        case "ArrowLeft":
          video.currentTime -= 5;
          break;

        case "ArrowUp":
          e.preventDefault();
          setVolume((prev: number) => Math.min(1, prev + 0.1));
          break;

        case "ArrowDown":
          e.preventDefault();
          setVolume((prev: number) => Math.max(0, prev - 0.1));
          break;

        case "m":
        case "M":
          const newMuted = !video.muted;
          video.muted = newMuted;
          setIsMuted(newMuted);
          break;

        case "f":
        case "F":
          if (!document.fullscreenElement) {
            video.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};