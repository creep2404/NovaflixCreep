import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
} from "./auth.service";
import {
  checkLoginAttempts,
  increaseLoginAttempts,
  resetLoginAttempts,
} from "@/common/utils/brute-force.util";
import { successResponse } from "@/common/utils/successResponse";
import { AuthRequest } from "@/common/middleware/auth.middleware";
import { updateUserRefreshToken } from "../user/user.repository";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await registerService(email, password);

  return successResponse(res, user, "Register successfully");
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const isProd = process.env.NODE_ENV === "production";
  console.log("🚀 isProd:", isProd);
  const key = `login:${req.ip}`;

  const allowed = await checkLoginAttempts(key);
  if (!allowed) throw new Error("Too many attempts");

  const { email, password } = req.body;

  const data = await loginService(email, password);

  // SET COOKIE
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: isProd, 
    sameSite: isProd ? "strict" : "lax", 
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  await resetLoginAttempts(key);

  return successResponse(
    res,
    {
      user: data.user,
      accessToken: data.accessToken,
    },
    "Login successfully",
  );
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  await updateUserRefreshToken(req.user!.userId, null, null);

  res.clearCookie("refreshToken", {
    path: "/auth/refresh",
  });

  return successResponse(res, null, "Logout successfully");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  const data = await refreshTokenService(token);
  if (!data) {
    return successResponse(res, null);
  }

  // rotate cookie
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return successResponse(res, {
    accessToken: data.accessToken,
  });
});
