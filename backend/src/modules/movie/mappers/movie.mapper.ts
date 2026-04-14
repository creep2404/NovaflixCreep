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
    slug: movie.slug,
    thumbnailUrl: movie.thumbnailUrl,

    // RAW DATA
    duration: movie.duration,

    // UI
    durationLabel: formatDuration(movie.duration),

    createdAt: movie.createdAt,

    // FROM MOVIE DETAIL
    description: movie.detail?.description,
    videoId: movie.detail?.videoId,
    trailerUrl: movie.detail?.trailerUrl,
    releaseDate: movie.detail?.releaseDate,

    rating: movie.detail?.rating ?? 0,

    // GENRES
    genres: movie.genres?.map((g: any) => g.genre.name) || [],
  };
};
