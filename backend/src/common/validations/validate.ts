import { RequestHandler } from "express";
import { z } from "zod";

type Source = "body" | "params" | "query";

const validate =
  <T extends z.ZodType>(schema: T, source: Source): RequestHandler =>
  async (req, res, next) => {
    const result = await schema.safeParseAsync(req[source]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${source} schema`,
        errors: result.error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    // lưu lại data đã parse
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