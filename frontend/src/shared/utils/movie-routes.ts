export interface ParsedEpisodeRoute {
  episodeNo: number;
  episodeId: string;
}

export function parseEpisodeInfo(
  episodeInfo?: string,
): ParsedEpisodeRoute | null {
  if (!episodeInfo) return null;

  const match = episodeInfo.match(/^episode-(\d+)-(.+)$/);

  if (!match) return null;

  return {
    episodeNo: Number(match[1]),
    episodeId: match[2],
  };
}

export function buildMovieWatchUrl(
  movieSlug: string,
  episodeNo: number,
  episodeId: string,
) {
  return `/movie/watch/${encodeURIComponent(movieSlug)}/episode-${episodeNo}-${episodeId}`;
}
