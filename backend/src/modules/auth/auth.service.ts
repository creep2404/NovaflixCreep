import bcrypt from "bcrypt";
import { AppError } from "@/common/utils/AppError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/common/security/jwt.util";
import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
  updateUserRefreshToken,
} from "../user/user.repository";
import { JwtPayload } from "@/common/types/jwt.type";

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
    sub: user.id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    sub: user.id,
    role: user.role,
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
  if (!token) return null;

  let payload: JwtPayload;

  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await findUserByIdRepo(payload.sub); 

  if (!user?.refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (!user.refreshTokenExpiresAt || user.refreshTokenExpiresAt < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  const newRefreshToken = generateRefreshToken({
    sub: user.id,
    role: user.role,
  });

  await updateUserRefreshToken(
    user.id,
    newRefreshToken,
    new Date(Date.now() + REFRESH_TOKEN_EXPIRES),
  );

  const accessToken = generateAccessToken({
    sub: user.id,
    role: user.role,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
export const logoutService = async (userId: string) => {
  await updateUserRefreshToken(userId, "", new Date(0));
};
