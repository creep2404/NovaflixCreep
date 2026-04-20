import { Request, Response } from "express";
import { generateSignedCookies } from "@/common/infra/cloudfront-cookie.util";
import { env } from "@/config/env";

export const getStreamingCookie = (req: Request, res: Response) => {
  const cookies = generateSignedCookies();

  Object.entries(cookies).forEach(([key, value]) => {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: env.COOKIE_DOMAIN, 
      path: "/",
    });
  });

  return res.json({
    success: true,
    message: "Streaming cookie set",
  });
};