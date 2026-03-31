import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { registerService, loginService } from "./auth.service";
import { checkLoginAttempts, increaseLoginAttempts, resetLoginAttempts } from "@/common/utils/brute-force.util";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await registerService(email, password);

  res.json({
    success: true,
    data: user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const key = `login:${req.ip}`;

  // 🔥 check block
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

    res.json({
      success: true,
      userData,
    });
  } catch (err) {
    // login fail → increase count
    await increaseLoginAttempts(key);

    throw err;
  }
});

export const logout = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
