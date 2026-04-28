export const useFullscreen = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return { toggleFullscreen };
};