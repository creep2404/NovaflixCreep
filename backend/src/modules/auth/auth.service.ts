import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/client";
import { createUser, findUserByEmail } from "../user/user.repository";

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
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
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
