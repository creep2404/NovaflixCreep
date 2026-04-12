import { prisma } from "@/database/client";

export const findUserByEmailRepo = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUserRepo = async (data: {
  email: string;
  password: string;
}) => {
  return await prisma.user.create({
    data,
  });
};

export const findUserByIdRepo = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const getAllUserRepo = async () => {
  return await prisma.user.findMany({
    select: { id: true },
  });
};

export const updateUserRefreshToken = (
  userId: string,
  refreshToken: string,
  expiresAt: Date,
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken,
      refreshTokenExpiresAt: expiresAt,
    },
  });
};
