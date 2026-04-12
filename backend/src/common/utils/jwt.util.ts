import { env } from "@/config/env";
import jwt from "jsonwebtoken";



const ACCESS_SECRET = env.JWT_SECRET as string;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET as string;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets are not defined");
}

// ACCESS TOKEN (short-lived)
export const generateAccessToken = (payload: { userId: string }) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// REFRESH TOKEN (long-lived)
export const generateRefreshToken = (payload: { userId: string }) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

// VERIFY ACCESS TOKEN
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as { userId: string };
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};