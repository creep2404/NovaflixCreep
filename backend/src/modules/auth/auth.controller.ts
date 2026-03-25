import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  res.json({ message: "Register success" });
};

export const login = (req: Request, res: Response) => {
  res.json({ message: "Login success" });
};