import { useEffect, useRef, useState } from "react";
import { saveWatchHistory } from "../apis/watchHistory.api";

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

    console.log("✅ Video element found, adding event listeners.");

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
  // SAVE HISTORY (DEBOUNCE)
  // ========================
  useEffect(() => {
    if (!movieId) return;

    const handler = setTimeout(() => {
      if (!videoRef.current) return;

      saveWatchHistory({
        movieId,
        progress: videoRef.current.currentTime,
      });
    }, 3000); // debounce 3s

    return () => clearTimeout(handler);
  }, [currentTime, movieId]);

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
