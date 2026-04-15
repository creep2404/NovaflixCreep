import bcrypt from "bcrypt";
import { AppError } from "@/common/utils/AppError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/common/utils/jwt.util";
import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
  updateUserRefreshToken,
} from "../user/user.repository";

const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60 * 1000; // 7 days

export const registerService = async (email: string, password: string) => {
  const existingUser = await findUserByEmailRepo(email);

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUserRepo({
    email,
    password: hashedPassword,
  });

  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  await updateUserRefreshToken(
    user.id,
    refreshToken,
    new Date(Date.now() + REFRESH_TOKEN_EXPIRES),
  );

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new AppError("No refresh token provided", 400);
  }

  let payload;

  try {
    payload = verifyRefreshToken(token);
  } catch (err) {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await findUserByIdRepo(payload.userId);

  if (!user || !user.refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (!user.refreshTokenExpiresAt || user.refreshTokenExpiresAt < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
  });

  await updateUserRefreshToken(
    user.id,
    newRefreshToken,
    new Date(Date.now() + REFRESH_TOKEN_EXPIRES),
  );

  const accessToken = generateAccessToken({
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
