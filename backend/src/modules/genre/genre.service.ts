import { QueryGenreDto } from "./dto/query-genre.dto";
import { getGenresRepo } from "./genre.repository";
import { formatGenre } from "./mappers/genre.mapper";

export const getGenresService = async (query: QueryGenreDto) => {
  const limit = query.limit ?? 6;
  const skip = query.skip ?? 0;

  const genres = await getGenresRepo({
    skip,
    take: limit,
    search: query.search,
  });
  return {
    dataGenre: (genres ?? []).map(formatGenre),
    meta: {
      skip,
      limit,
      hasMore: genres.length === limit,
    },
  };
};
