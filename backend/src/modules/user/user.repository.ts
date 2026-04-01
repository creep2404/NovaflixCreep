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

export const getUserByIdRepo = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAllUserRepo = async () => {
  return await prisma.user.findMany({
    select: { id: true },
  });
};