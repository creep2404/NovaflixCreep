export type CreateEpisodeRepoInput = {
  title: string;
  videoId: string;
  duration: number;
  episodeNo: number;
  description: string;
};

export type UpdateEpisodeRepoInput = {
  title?: string;
  videoId?: string;
  duration?: number;
  episodeNo?: number;
  description?: string;
};