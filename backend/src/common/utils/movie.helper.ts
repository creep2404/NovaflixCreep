import { getCachedPresignedUrl } from "./presigned-cache.util";

export const signMovieThumbnail = async <
  T extends { thumbnailUrl: string | null },
>(
  movie: T,
): Promise<T> => {
  if (!movie.thumbnailUrl) {
    return movie;
  }

  return {
    ...movie,
    thumbnailUrl: await getCachedPresignedUrl(movie.thumbnailUrl),
  };
};

export const signMovieThumbnails = async <
  T extends { thumbnailUrl: string | null },
>(
  movies: T[],
): Promise<T[]> => {
  return Promise.all(movies.map(signMovieThumbnail));
};
