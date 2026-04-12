import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { registerService, loginService } from "./auth.service";
import { checkLoginAttempts, increaseLoginAttempts, resetLoginAttempts } from "@/common/utils/brute-force.util";
import { successResponse } from "@/common/utils/successResponse";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await registerService(email, password);

  return successResponse(res, user, "Register successfully");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const key = `login:${req.ip}`;
  // check block
  const allowed = await checkLoginAttempts(key);
  if (!allowed) {
    return res.status(429).json({
      message: "Too many failed attempts. Try again later.",
    });
  }
  const { email, password } = req.body;
  try {
    const userData = await loginService(email, password);
    
    await resetLoginAttempts(key);
    return successResponse(res, userData, "Login successfully");
  } catch (err) {
    // login fail → increase count
    await increaseLoginAttempts(key);

    throw err;
  }
});

export const logout = (req: Request, res: Response) => {
  return successResponse(res, null, "Logout successfully");
};
