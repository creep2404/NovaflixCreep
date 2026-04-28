import { AppError } from "@/common/utils/AppError";
import {
  createUserRepo,
  findUserByEmailRepo,
  getAllUserRepo,
  findUserByIdRepo,
} from "./user.repository";

export const findUserByEmailService = async (email: string) => {
  if (!email) throw new AppError("Email is required");
  const user = await findUserByEmailRepo(email);
  if (!user) throw new AppError("User not found");

  return user;
};

export const createUserService = async (data: {
  email: string;
  password: string;
}) => {
  return await createUserRepo(data);
};

export const getUserByIdService = async (id: string) => {
  if (!id) throw new AppError("User ID is required");

  const user = await findUserByIdRepo(id);

  if (!user) throw new AppError("User not found");

  return user;
};

export const getAllUserService = async () => {
  return await getAllUserRepo();
};
