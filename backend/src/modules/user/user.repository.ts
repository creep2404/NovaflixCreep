import { prisma } from "@/database/client";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  email: string;
  password: string;
}) => {
  return prisma.user.create({
    data,
  });
};