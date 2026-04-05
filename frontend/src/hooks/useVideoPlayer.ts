import { useEffect, useRef, useState } from "react";
import { getWatchHistory, saveWatchHistory } from "../apis/watchHistory.api";

export const useVideoPlayer = (movieId: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);

  // ========================
  // VIDEO EVENTS
  // ========================
  useEffect(() => {
    let interval: any;

    const setup = () => {
      const video = videoRef.current;

      if (!video) return;

      const onTimeUpdate = () => setCurrentTime(video.currentTime);
      const onLoaded = () => setDuration(video.duration);
      const onWaiting = () => setIsBuffering(true);
      const onPlaying = () => setIsBuffering(false);

      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("playing", onPlaying);

      clearInterval(interval); // 🔥 dừng polling

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("playing", onPlaying);
      };
    };

    interval = setInterval(setup, 100); // 🔥 chờ video mount

    return () => clearInterval(interval);
  }, []);

  // ========================
  // PLAY / PAUSE
  // ========================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    isPlaying ? video.play() : video.pause();
  }, [isPlaying]);

  // ========================
  // VOLUME
  // ========================
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // ========================
  // SEEK
  // ========================
  const seek = (percent: number) => {
    console.log("video.duration:", videoRef.current?.duration);
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const percentClamped = Math.min(100, Math.max(0, percent));
    video.currentTime = (percentClamped / 100) * video.duration;
  };

  // ========================
  // SAVE HISTORY (DEBOUNCE)
  // ========================
  useEffect(() => {
    if (!movieId) return;

    const handler = setTimeout(() => {
      if (!videoRef.current) return;

      const progress = videoRef.current.currentTime;

      if (progress < 1) return;

      saveWatchHistory({
        movieId,
        progress,
      });

      console.log("Saving watch history:", {
        movieId,
        progress: videoRef.current.currentTime,
      });
    }, 3000); // debounce 3s

    return () => clearTimeout(handler);
  }, [currentTime, movieId]);

  // ========================
  // LOAD HISTORY ON MOUNT
  // ========================
  useEffect(() => {
     console.log("EFFECT RUN: movieId =", movieId); 

    if (!movieId) return;

    let cancelled = false;

    const init = async () => {
      try {
        // 🔥 CALL API 1 LẦN
        const res = await getWatchHistory(movieId);
        const progress = res.data?.progress;

        console.log("Loaded watch history:", progress);

        if (!progress) return;

        // chỉ polling video, KHÔNG polling API
        const waitForVideo = () => {
          const video = videoRef.current;

          if (!video) {
            requestAnimationFrame(waitForVideo);
            return;
          }

          const seek = () => {
            if (cancelled) return;
            console.log("SEEK TO:", progress);
            video.currentTime = progress;
          };

          if (video.readyState >= 2) {
            seek();
          } else {
            video.addEventListener("loadeddata", seek, { once: true });
          }
        };

        waitForVideo();
      } catch (err) {
        console.error("Failed to load watch history");
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  // ========================
  // FULLSCREEN
  // ========================
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return {
    videoRef,
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    isBuffering,
    seek,
    toggleFullscreen,
  };
};
