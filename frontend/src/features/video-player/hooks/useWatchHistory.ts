import { useEffect, useRef } from "react";
import {
  getWatchHistory,
  saveWatchHistory,
} from "@/src/apis/watchHistory.api";

export const useWatchHistory = ({
  movieId,
  videoRef,
  isPlaying,
  profile,
}: {
  movieId: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  profile: any;
}) => {
  const lastSavedTimeRef = useRef(0);
  const lastSavedAtRef = useRef(0);

  // ========================
  // LOAD (RESUME)
  // ========================
  useEffect(() => {
    if (!movieId || !profile) return;

    let cancelled = false;

    const init = async () => {
      try {
        const res = await getWatchHistory(movieId);
        const progress = res?.progress;

        if (!progress) return;

        const waitForVideo = () => {
          const video = videoRef.current;

          if (!video) {
            requestAnimationFrame(waitForVideo);
            return;
          }

          const seek = () => {
            if (cancelled) return;
            video.currentTime = progress;
          };

          if (video.readyState >= 2) {
            seek();
          } else {
            video.addEventListener("loadeddata", seek, { once: true });
          }
        };

        waitForVideo();
      } catch {
        console.error("Failed to load watch history");
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [movieId, profile]);

  // ========================
  // AUTO SAVE
  // ========================
  useEffect(() => {
    if (!movieId || !profile) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;

      const video = videoRef.current;
      if (!video) return;

      const progress = Math.floor(video.currentTime);
      const now = Date.now();

      if (progress < 1) return;

      if (Math.abs(progress - lastSavedTimeRef.current) < 5) return;

      if (now - lastSavedAtRef.current < 10000) return;

      const percent = video.duration
        ? progress / video.duration
        : 0;

      // Netflix logic: nếu gần hết → reset
      if (percent > 0.95) {
        saveWatchHistory({ movieId, progress: 0 });
        lastSavedTimeRef.current = 0;
        lastSavedAtRef.current = now;
        return;
      }

      lastSavedTimeRef.current = progress;
      lastSavedAtRef.current = now;

      saveWatchHistory({ movieId, progress });
    }, 5000);

    return () => clearInterval(interval);
  }, [movieId, profile]);

  // ========================
  // SAVE ON PAUSE
  // ========================
  useEffect(() => {
    if (!movieId || !profile) return;

    if (!isPlaying) {
      const video = videoRef.current;
      if (!video) return;

      const progress = Math.floor(video.currentTime);

      if (progress > 1) {
        saveWatchHistory({ movieId, progress });
      }
    }
  }, [isPlaying]);

  // SAVE ON UNLOAD
  useEffect(() => {
    if (!movieId || !profile) return;

    const handleBeforeUnload = () => {
      const video = videoRef.current;
      if (!video) return;

      const progress = Math.floor(video.currentTime);

      if (progress > 1) {
        navigator.sendBeacon(
          "/api/watch-history",
          JSON.stringify({ movieId, progress })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [movieId, profile]);
};
