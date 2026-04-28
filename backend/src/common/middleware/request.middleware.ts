// common/middleware/request.middleware.ts

import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../config/logger";

export const requestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = uuidv4();

  req.headers["x-request-id"] = requestId;

  const start = Date.now();

  logger.info({
    requestId,
    method: req.method,
    url: req.url,
    body: req.body,
  }, "Incoming request");

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
    }, "Request completed");
  });

  next();
};