import { logger } from "@/config/logger";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const requestId = req.headers["x-request-id"];

  logger.error(
    {
      requestId,
      method: req.method,
      url: req.url,
      error: {
        message: err.message,
        stack: err.stack,
      },
    },
    "Unhandled error"
  );

  res.status(err.status ?? 500).json({
    success: false,
    message: err.message ?? "Internal Server Error",
    requestId, 
  });
};