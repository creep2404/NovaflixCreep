import { useEffect, useRef, useState } from "react";
import { getWatchHistory, saveWatchHistory } from "../apis/watchHistory.api";
import { useAuth } from "./useAuth";

export const useVideoPlayer = (movieId: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { profile } = useAuth();

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
  const lastSavedRef = useRef(0); // last saved progress
  useEffect(() => {
    if (!movieId || !profile) return;

    const handler = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;

      const progress = video.currentTime;

      // skip nếu chưa xem đủ
      if (progress < 1) return;

      // chỉ save nếu tiến thêm >= 5s
      if (Math.abs(progress - lastSavedRef.current) < 5) return;

      lastSavedRef.current = progress;

      saveWatchHistory({
        movieId,
        progress,
      });

      console.log("Saving watch history:", {
        movieId,
        progress,
      });
    }, 3000); // debounce 3s

    return () => clearTimeout(handler);
  }, [currentTime, movieId, profile]);

  // ========================
  // LOAD HISTORY ON MOUNT
  // ========================
  useEffect(() => {
    if (!movieId || !profile) return;

    let cancelled = false;

    const init = async () => {
      try {
        const res = await getWatchHistory(movieId);
        const progress = res.data?.progress;

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
  }, [movieId, profile]);

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

  // ========================
  // KEYBOARD SHORTCUTS
  // ========================
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
          setIsPlaying((prev) => !prev);
          break;

        case "ArrowRight":
          video.currentTime += 10;
          break;

        case "ArrowLeft":
          video.currentTime -= 10;
          break;

        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => Math.min(1, prev + 0.1));
          break;

        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 0.1));
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

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
