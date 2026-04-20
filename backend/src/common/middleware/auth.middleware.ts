import { env } from "@/config/env";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "user" | "admin";
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      userId: string;
      role: "user" | "admin";
    };

    req.user = decoded;
    next();
  } catch (error) {
    return next({
      status: 401,
      message: "Invalid token",
    });
  }
};

export const requireRole =
  (role: "user" | "admin") =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next({
        status: 401,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== role) {
      return next({
        status: 403,
        message: "Forbidden",
      });
    }

    next();
  };
