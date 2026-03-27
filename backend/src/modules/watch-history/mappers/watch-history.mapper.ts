export const formatWatchHistory = (item: any) => {
  return {
    movieId: item.movieId,
    progress: item.progress,
    updatedAt: item.updatedAt,
    movie: {
      id: item.movie.id,
      title: item.movie.title,
      thumbnailUrl: item.movie.thumbnailUrl,
      duration: item.movie.duration,
    },
  };
};