export const formatMovie = (movie: any) => {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    videoUrl: movie.videoUrl,
    thumbnailUrl: movie.thumbnailUrl,
    duration: movie.duration,
    createdAt: movie.createdAt,
    genres: movie.genres.map((g: any) => g.genre.name),
  };
};