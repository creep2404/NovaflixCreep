import { useEffect, useRef } from "react";
import {
  getWatchHistory,
  saveWatchHistory,
  WatchHistory,
} from "@/src/apis/watchHistory.api";

interface UseWatchHistoryProps {
  movieId: string;
  episodeId: string;

  videoRef: React.RefObject<HTMLVideoElement>;

  isPlaying: boolean;
  profile: any;
  history?: WatchHistory | null;
}

export const useWatchHistory = ({
  movieId,
  episodeId,
  videoRef,
  isPlaying,
  profile,
  history,
}: UseWatchHistoryProps) => {
  const lastSavedTimeRef = useRef(0);
  const lastSavedAtRef = useRef(0);

  // ========================
  // RESUME
  // ========================

  useEffect(() => {
    if (!profile) return;

    if (!history) return;

    if (history.episode.episodeId !== episodeId) return;

    let cancelled = false;

    const waitForVideo = () => {
      const video = videoRef.current;

      if (!video) {
        requestAnimationFrame(waitForVideo);
        return;
      }

      const seek = () => {
        if (cancelled) return;

        console.log("RESUME RUNNING", {
          progress: history.progress,
          before: video.currentTime,
        });

        video.currentTime = history.progress;

        console.log("AFTER SEEK", {
          after: video.currentTime,
        });
      };

      if (video.readyState >= 2) {
        seek();
      } else {
        video.addEventListener("loadeddata", seek, {
          once: true,
        });
      }
    };

    waitForVideo();

    return () => {
      cancelled = true;
    };
  }, [history, episodeId, profile]);

  // ========================
  // AUTO SAVE
  // ========================

  useEffect(() => {
    if (!profile) return;

    if (!movieId) return;

    if (!episodeId) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") {
        return;
      }

      const video = videoRef.current;

      if (!video) return;

      const progress = Math.floor(video.currentTime);

      const now = Date.now();

      if (progress < 1) return;

      if (Math.abs(progress - lastSavedTimeRef.current) < 5) {
        return;
      }

      if (now - lastSavedAtRef.current < 10000) {
        return;
      }

      const percent = video.duration > 0 ? progress / video.duration : 0;

      // watched complete
      if (percent > 0.95) {
        saveWatchHistory({
          movieId,
          episodeId,
          progress: 0,
        });

        lastSavedTimeRef.current = 0;
        lastSavedAtRef.current = now;

        return;
      }

      lastSavedTimeRef.current = progress;

      lastSavedAtRef.current = now;

      saveWatchHistory({
        movieId,
        episodeId,
        progress,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movieId, episodeId, profile]);

  // ========================
  // SAVE ON PAUSE
  // ========================

  useEffect(() => {
    console.log("useWatchHistory - isPlaying:", isPlaying);
    if (!profile) return;

    if (isPlaying) return;

    const video = videoRef.current;

    if (!video) return;

    const progress = Math.floor(video.currentTime);

    if (progress < 1) return;

    saveWatchHistory({
      movieId,
      episodeId,
      progress,
    });
  }, [isPlaying, movieId, episodeId, profile]);

  // ========================
  // SAVE ON UNLOAD
  // ========================

  useEffect(() => {
    if (!profile) return;

    const handleBeforeUnload = () => {
      const video = videoRef.current;

      if (!video) return;

      const progress = Math.floor(video.currentTime);

      if (progress < 1) return;

      navigator.sendBeacon(
        "/api/watch-history/progress",
        JSON.stringify({
          movieId,
          episodeId,
          progress,
        }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [movieId, episodeId, profile]);
};
