import Hls from "hls.js";
import { useEffect, forwardRef, useRef } from "react";

type VideoSource = {
  type: "mp4" | "hls";
  url: string;
};

type Props = {
  source: VideoSource;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

const VideoPlayer = forwardRef<HTMLVideoElement, Props>(
  ({ source, className, isPlaying, setIsPlaying, ...rest }, ref) => {
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const video = (ref as React.RefObject<HTMLVideoElement>)?.current;
      if (!video) return;

      video.pause();
      video.removeAttribute("src");
      video.load();

      if (source.type === "mp4") {
        video.src = source.url;
        video.load();
      } else if (source.type === "hls") {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(source.url);
          hls.attachMedia(video);

          return () => hls.destroy();
        } else {
          video.src = source.url;
          video.load();
        }
      }
    }, [source, ref]);

    return (
      <video
        ref={ref}
        className={className}
        onClick={() => {
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
          }

          clickTimeoutRef.current = setTimeout(() => {
            setIsPlaying((prev) => !prev);
          }, 200);
        }}
        onDoubleClick={(e) => {
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
          }

          const video = (ref as React.RefObject<HTMLVideoElement>)?.current;
          if (!video) return;

          const rect = video.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;

          // 🔥 LEFT ZONE
          if (clickX < width * 0.4) {
            video.currentTime = Math.max(0, video.currentTime - 10);
            return;
          }

          // 🔥 RIGHT ZONE
          if (clickX > width * 0.6) {
            video.currentTime = Math.min(
              video.duration,
              video.currentTime + 10,
            );
            return;
          }

          // 🔥 CENTER → fullscreen
          if (!document.fullscreenElement) {
            video.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        {...rest}
      />
    );
  },
);

export default VideoPlayer;
