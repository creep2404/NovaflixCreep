import { RequestHandler } from "express";
import { z } from "zod";
import { sanitizeObject } from "../security/sanitize.util";

type Source = "body" | "params" | "query";

const validate =
  <T extends z.ZodType>(schema: T, source: Source): RequestHandler =>
  async (req, res, next) => {
    const rawData = req[source];

    const sanitizedData = sanitizeObject(rawData);

    const result = await schema.safeParseAsync(sanitizedData);

    if (!result.success) {
      return next({
        status: 400,
        message: `Invalid ${source} schema`,
        errors: result.error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    // saved validated data
    req.validated = req.validated || {};
    req.validated[source] = result.data;

    next();
  };

export const validateRequestBody = <T extends z.ZodType>(schema: T) =>
  validate(schema, "body");

export const validateRequestParams = <T extends z.ZodType>(schema: T) =>
  validate(schema, "params");

export const validateRequestQuery = <T extends z.ZodType>(schema: T) =>
  validate(schema, "query");
