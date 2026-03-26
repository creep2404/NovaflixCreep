import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { registerService, loginService } from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await registerService(email, password);

  res.json({
    success: true,
    data: user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await loginService(email, password);

  res.json({
    success: true,
    data,
  });
});