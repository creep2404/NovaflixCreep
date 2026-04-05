import Hls from "hls.js";
import { useEffect, forwardRef } from "react";

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
    useEffect(() => {
      const video = (ref as React.RefObject<HTMLVideoElement>)?.current;
      if (!video) return;

      // reset
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
          setIsPlaying((prev) => !prev);
        }}
        {...rest}
      />
    );
  },
);

export default VideoPlayer;
