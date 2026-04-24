// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import { successResponse } from "@/common/utils/successResponse";
import { getUserByIdService } from "./user.service";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.validated!.params as { id: string };

  const user = await getUserByIdService(id);

  return successResponse(res, user, "Get user successfully");
});