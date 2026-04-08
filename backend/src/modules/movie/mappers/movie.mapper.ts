export const formatMovie = (movie: any) => {
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    videoUrl: movie.videoUrl,
    thumbnailUrl: movie.thumbnailUrl,

    // RAW DATA (logic)
    duration: movie.duration,

    // FORMATTED DATA (UI render)
    durationLabel: formatDuration(movie.duration),

    createdAt: movie.createdAt,

    // FILTER RELATED
    rating: movie.rating ?? 0,
    isPremium: movie.isPremium ?? false,

    // GENRES
    genres: movie.genres?.map((g: any) => g.genre.name) || [],
  };
};