import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Subtitles,
  Settings,
  ChevronLeft,
  Heart,
  Share2,
  Flag,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { MOCK_MOVIES, MOCK_EPISODES, MOCK_COMMENTS } from "../data/mock";
import { MovieCard } from "../components/ui/MovieCard";
//import { useSimulatedData } from '../hooks/useData';
import { Skeleton, SkeletonCard } from "../components/ui/Skeleton";
import { ErrorState, EmptyState } from "../components/ui/StateViews";
import { getMovieById, getMoviePlaybackData } from "../apis/movie.api";
import { getWatchHistory } from "../apis/watchHistory.api";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import VideoPlayer from "../components/ui/VideoPlayer";

export const PlayerPage = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [videoSource, setVideoSource] = useState<{
    type: "mp4" | "hls";
    url: string;
  } | null>(null);

  const {
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
  } = useVideoPlayer(movieId!);

  // FETCH MOVIE DETAILS + VIDEO
  useEffect(() => {
    if (!movieId) return;
    const fetchMovie = async () => {
      try {
        setIsLoading(true);

        const movieData = await getMovieById(movieId);
        setMovie(movieData);
        
        const res = await getMoviePlaybackData(movieId);
        
        const playbackData = await res.data;
        
        setVideoSource(playbackData);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  // RESUME WATCH HISTORY
  //Khi load page -> resume
  useEffect(() => {
    if (!movieId) return;

    const fetchProgress = async () => {
      try {
        const data = await getWatchHistory(movieId);

        if (videoRef.current && data?.progress) {
          videoRef.current.currentTime = data.progress;
        }
      } catch (err) {
        console.error(err);
        console.error("Fetch RESUME WATCH HISTORY error", err);
      }
    };

    fetchProgress();
  }, [movieId]);

  // UI STATES
  if (!movieId) {
    return (
      <div className="min-h-screen bg-surface pt-24">
        <EmptyState
          title="Invalid movie"
          message="Missing movie ID in URL."
          action={{ label: "Go Home", onClick: () => navigate("/") }}
        />
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-surface animate-in fade-in duration-500">
  //       <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-surface/80 to-transparent">
  //         <Skeleton className="h-10 w-32 rounded-full" />
  //         <div className="flex gap-4">
  //           <Skeleton className="h-10 w-10 rounded-full" />
  //           <Skeleton className="h-10 w-10 rounded-full" />
  //         </div>
  //       </nav>

  //       <div className="relative w-full aspect-video max-h-[70vh] bg-black">
  //         <Skeleton className="w-full h-full rounded-none" />
  //       </div>

  //       <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
  //         <div className="lg:col-span-2 space-y-10">
  //           <div>
  //             <Skeleton className="h-12 w-3/4 mb-4" />
  //             <div className="flex gap-4 mb-6">
  //               <Skeleton className="h-6 w-20" />
  //               <Skeleton className="h-6 w-16" />
  //               <Skeleton className="h-6 w-16" />
  //             </div>
  //             <Skeleton className="h-24 w-full" />
  //           </div>

  //           <div className="space-y-6">
  //             <Skeleton className="h-8 w-48 mb-6" />
  //             {Array.from({ length: 3 }).map((_, i) => (
  //               <div key={i} className="flex gap-6 p-4">
  //                 <Skeleton className="w-8 h-8 rounded-full" />
  //                 <Skeleton className="w-40 aspect-video rounded-lg" />
  //                 <div className="flex-1">
  //                   <Skeleton className="h-6 w-3/4 mb-2" />
  //                   <Skeleton className="h-10 w-full" />
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         <div className="space-y-8">
  //           <Skeleton className="h-8 w-48 mb-6" />
  //           <div className="grid grid-cols-2 gap-4">
  //             {Array.from({ length: 4 }).map((_, i) => (
  //               <SkeletonCard key={i} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Skeleton className="w-1/2 h-64" />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-surface pt-24">
  //       <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-surface/80 to-transparent">
  //         <button
  //           onClick={() => navigate("/")}
  //           className="flex items-center gap-2 text-white hover:text-primary transition-colors bg-surface-highest/50 backdrop-blur-md px-4 py-2 rounded-full"
  //         >
  //           <ChevronLeft size={20} /> Back to Browse
  //         </button>
  //       </nav>
  //       <ErrorState
  //         title="Failed to load movie"
  //         message="We couldn't load the movie details right now. Please check your connection and try again."
  //         action={{ label: "Retry", onClick: () => window.location.reload() }}
  //       />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <ErrorState
        title="Failed to load movie"
        message="Please try again later."
        action={{ label: "Retry", onClick: () => window.location.reload() }}
      />
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-surface pt-24">
        <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-surface/80 to-transparent">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-primary transition-colors bg-surface-highest/50 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <ChevronLeft size={20} /> Back to Browse
          </button>
        </nav>
        <EmptyState
          title="Movie not found"
          message="The movie you are looking for does not exist or has been removed."
          action={{ label: "Browse Movies", onClick: () => navigate("/") }}
        />
      </div>
    );
  }

  // if (!movie) {
  //   return (
  //     <EmptyState
  //       title="Movie not found"
  //       message="The movie you are looking for does not exist or has been removed."
  //       action={{ label: "Browse Movies", onClick: () => navigate("/") }}
  //     />
  //   );
  // }

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-surface animate-in fade-in duration-500">
      {/* Top Nav Minimal */}
      <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between bg-gradient-to-b from-surface/80 to-transparent">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-primary transition-colors bg-surface-highest/50 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <ChevronLeft size={20} /> Back to Browse
        </button>
        <div className="flex gap-4 items-center">
          <button className="p-2 bg-surface-highest/50 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-2 bg-surface-highest/50 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      {/* Video Player Area */}
      <div className="relative w-full aspect-video max-h-[70vh] bg-black group">
        {/* Mocked Video */}
        {/* <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? "opacity-30" : "opacity-100"
          }`}
          muted
        >
          <source src={movie.videoUrl} type="video/mp4" />
        </video> */}
        <VideoPlayer
          source={videoSource}
          ref={videoRef}
          className="w-full h-full object-cover"
        />

        {/* <video src={videoSource.url} className="w-full h-full object-cover" controls /> */}

        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin w-10 h-10 border-4 border-white border-t-transparent rounded-full" />
          </div>
        )}
        {/* Big Play Button Overlay */}

        {/* Mocked play button, only shows when paused */}
        {/* {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Play size={60} />
          </button>
        )} */}

        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Play size={60} />
          </button>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          {/* (F) PROGRESS BAR */}
          <div
            className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = ((e.clientX - rect.left) / rect.width) * 100;
              seek(percent);
            }}
          >
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* CONTROL ROW */}
          <div className="flex items-center justify-between">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              {/* PLAY / PAUSE */}
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* (H) VOLUME */}

              <div className="flex items-center gap-2">
                <Volume2 size={18} />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>

              {/* (G) TIME */}
              <span className="text-sm text-white">
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}{" "}
                / {Math.floor(duration / 60)}:
                {Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              <button>
                <Subtitles size={20} />
              </button>

              <button>
                <Settings size={20} />
              </button>

              {/* (I) FULLSCREEN */}
              <button onClick={toggleFullscreen}>
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Info (Left 2/3) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Metadata */}
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-on-surface-variant mb-6">
              <span className="text-green-400 font-bold">
                {movie.matchPercentage}% Match
              </span>
              <span>{movie.year}</span>
              <span className="px-2 py-0.5 border border-white/20 rounded">
                {movie.rating}
              </span>
              <span>{movie.duration}</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">
                {movie.quality}
              </span>
              <div className="flex gap-2 ml-auto">
                {/* {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-surface-high rounded-full text-xs border border-white/5"
                  >
                    {g}
                  </span>
                ))} */}
              </div>
            </div>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {movie.data.description}
            </p>
          </div>

          {/* Episodes List (If Series) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-headline font-bold">Episodes</h2>
              <select className="bg-surface-high border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary">
                <option>Season 1</option>
                <option>Season 2</option>
              </select>
            </div>

            <div className="space-y-4">
              {MOCK_EPISODES.map((ep, idx) => (
                <div
                  key={ep.id}
                  className={`flex gap-6 p-4 rounded-xl transition-colors cursor-pointer ${idx === 0 ? "bg-surface-high border border-primary/20" : "hover:bg-surface-high/50 border border-transparent"}`}
                >
                  <div className="text-2xl font-headline font-bold text-on-surface-variant/50 w-8 flex items-center justify-center">
                    {ep.number}
                  </div>
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 group">
                    <img
                      src={ep.imageUrl}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={24} className="text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg truncate pr-4">
                        {ep.title}
                      </h3>
                      <span className="text-sm text-on-surface-variant">
                        {ep.duration}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      {ep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <MessageSquare size={24} className="text-primary" /> Community
              Discussion
            </h2>

            {/* Comment Input */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex-shrink-0" />
              <div className="flex-1 relative">
                <textarea
                  className="w-full bg-surface-high border border-white/10 rounded-xl p-4 text-sm text-white placeholder-on-surface-variant/50 outline-none focus:border-primary/50 resize-none h-24 transition-colors"
                  placeholder="Add a public comment..."
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button className="text-sm font-medium text-on-surface-variant hover:text-white px-3 py-1.5">
                    Cancel
                  </button>
                  <button className="text-sm font-bold bg-primary text-surface px-4 py-1.5 rounded-lg hover:bg-primary-dim transition-colors">
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6 mt-8">
              {MOCK_COMMENTS.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {comment.timeAgo}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-3">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp size={14} /> {comment.likes}
                      </button>
                      <button className="hover:text-white transition-colors">
                        Reply
                      </button>
                      <button className="hover:text-white transition-colors ml-auto">
                        <Flag size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="space-y-8">
          <h2 className="text-xl font-headline font-bold border-b border-white/10 pb-4">
            More Like This
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* {movies &&
              movies
                .slice(1, 5)
                .map((m) => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onClick={() => navigate(`/movie/${m.id}`)}
                    orientation="portrait"
                  />
                ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
