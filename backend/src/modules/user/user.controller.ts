// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/common/utils/asyncHandler";
import { successResponse } from "@/common/utils/successResponse";
import { getAllUserService, getUserByIdService } from "./user.service";
import { AuthRequest } from "@/common/middleware/auth.middleware";

// export const getUser = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.validated!.params as { id: string };

//   const user = await getUserByIdService(id);

//   return successResponse(res, user, "Get user successfully");
// });

// GET /users/me
export const getMe = asyncHandler(async (req: AuthRequest, res) => {
  const userId = req.user!.id;

  const user = await getUserByIdService(userId);

  return successResponse(res, user, "Get profile successfully");
});

// GET /users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUserService();

  return successResponse(res, users, "Get all users successfully");
});