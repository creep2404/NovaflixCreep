import { asyncHandler } from "@/common/utils/asyncHandler";
import { successResponse } from "@/common/utils/successResponse";
import { getGenresService } from "./genre.service";

export const getGenres = asyncHandler(async (req: Request, res: Response) => {
  const result = await getGenresService(req.validated!.query);
  return successResponse(res, result, "Get genres successfully");
});
