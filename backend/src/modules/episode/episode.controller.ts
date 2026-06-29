import { asyncHandler } from "@/common/utils/asyncHandler";

import { successResponse } from "@/common/utils/successResponse";

import { typedHandler } from "@/common/utils/typedRoute";

import {
  // createEpisodeService,
  // updateEpisodeService,
  // deleteEpisodeService,
  getNextEpisodeService,
} from "./episode.service";

// // POST /movies/:movieId/episodes
// export const createEpisode = asyncHandler(
//   typedHandler<CreateEpisodeInput, unknown, { movieId: string }>(
//     async (req, res) => {
//       const { movieId } = req.validated.params;

//       const episode = await createEpisodeService({
//         ...req.validated.body,

//         movieId,
//       });

//       return successResponse(res, episode, "Episode created successfully");
//     },
//   ),
// );

// // PATCH /episodes/:id
// export const updateEpisode = asyncHandler(
//   typedHandler<UpdateEpisodeInput, unknown, { id: string }>(
//     async (req, res) => {
//       const { id } = req.validated.params;

//       const episode = await updateEpisodeService(id, req.validated.body);

//       return successResponse(res, episode, "Episode updated successfully");
//     },
//   ),
// );

// // DELETE /episodes/:id
// export const deleteEpisode = asyncHandler(
//   typedHandler<unknown, unknown, { id: string }>(async (req, res) => {
//     const { id } = req.validated.params;

//     const result = await deleteEpisodeService(id);

//     return successResponse(res, result, "Episode deleted successfully");
//   }),
// );

//GET /episodes/:id/next
export const getNextEpisode = asyncHandler(
  typedHandler<unknown, unknown, { id: string }>(async (req, res) => {
    const { id } = req.validated.params;

    const result = await getNextEpisodeService(id);

    return successResponse(res, result);
  }),
);