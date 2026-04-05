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

//not used for now, but can be used when we want to return the whole watch history list (with movie details) instead of single item
export const formatWatchHistoryList = (list: any[]) => {
  return list.map(formatWatchHistory);
};