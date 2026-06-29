import { MoviePayload } from "../movie.type";

export const formatMovie = (movie: MoviePayload) => {
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h}h ${m}m`;
    }

    if (m > 0) {
      return `${m}m`;
    }

    return `${s}s`;
  };

  return {
    id: movie.id,
    title: movie.title,
    slug: movie.slug,
    thumbnailUrl: movie.thumbnailUrl,

    // RAW
    duration: movie.duration,

    // UI
    durationLabel: formatDuration(movie.duration),
    type: movie.type,
    createdAt: movie.createdAt,

    // FROM MOVIE DETAIL
    description: movie.detail?.description,
    videoId: movie.detail?.videoId,
    trailerUrl: movie.detail?.trailerUrl,
    releaseDate: movie.detail?.releaseDate,

    rating: movie.detail?.rating ?? 0,
    country: movie.detail?.country,
    ageRating: movie.detail?.ageRating,

    // GENRES
    genres: movie.genres?.map((g: any) => g.genre.name),

    // SEASONS
    seasons: movie.seasons?.map((season) => ({
      id: season.id,
      title: season.title,
      seasonNo: season.seasonNo,

      //EPISODES
      episodes: season.episodes?.map((episode: any) => ({
        ...episode,

        // RAW
        duration: episode.duration,

        // UI
        durationLabel: formatDuration(episode.duration),
      })),
    })),
  };
};
