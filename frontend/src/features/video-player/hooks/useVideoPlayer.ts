import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useWatchHistory } from "./useWatchHistory";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { useFullscreen } from "./useFullscreen";

export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useKeyboardShortcuts({
    videoRef,
    setIsPlaying,
    setVolume,
    setIsMuted,
  });

  // Fullscreen
  const { toggleFullscreen } = useFullscreen(videoRef);

  // ========================
  // SHOW CONTROLS ON PAUSE, HIDE ON PLAY
  // ========================
  const resetHideTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setShowControls(true);

    timeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000); // 3s auto hide
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePause = () => setShowControls(true);
    const handlePlay = resetHideTimer;

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

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

      clearInterval(interval); // dừng polling

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("playing", onPlaying);
      };
    };

    interval = setInterval(setup, 100); // chờ video mount

    return () => clearInterval(interval);
  }, []);

  // ========================
  // PLAY / PAUSE
  // ========================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });
    } else {
      video.pause();
    }
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
  // MUTE
  // ========================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;

    if (volume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
    }
  }, [volume]);

  // ========================
  // CLEANUP ON UNMOUNT
  // ========================
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
    isMuted,
    setIsMuted,
    showControls,
    timeoutRef,
    resetHideTimer,
  };
};
