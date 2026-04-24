import { Response, NextFunction, RequestHandler } from "express";
import { ValidatedRequest } from "@/common/types/validated-request";

type Handler<TBody, TQuery, TParams> = (
  req: ValidatedRequest<TBody, TQuery, TParams>,
  res: Response,
  next: NextFunction,
) => any;

export const typedHandler =
  <TBody = unknown, TQuery = unknown, TParams = unknown>(
    handler: Handler<TBody, TQuery, TParams>,
  ): RequestHandler =>
  (req, res, next) =>
    handler(req as ValidatedRequest<TBody, TQuery, TParams>, res, next);
