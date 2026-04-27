import { asyncHandler } from "@/common/utils/asyncHandler";
import { successResponse } from "@/common/utils/successResponse";
import { getGenresService } from "./genre.service";
import { typedHandler } from "@/common/utils/typedRoute";
import { QueryGenreDto } from "./dto/query-genre.dto";

export const getGenres = asyncHandler(
  typedHandler<unknown, QueryGenreDto>(async (req, res) => {
    const result = await getGenresService(req.validated!.query);
    return successResponse(res, result, "Get genres successfully");
  }),
);
