import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/client";
import { createUser, findUserByEmail } from "../user/user.repository";
import { AppError } from "@/common/utils/AppError";

const SALT_ROUNDS = 10;

export const registerService = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    password: hashedPassword,
  });

  // remove password
  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    } as jwt.SignOptions,
  );

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};
