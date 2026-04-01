import { createUserRepo, findUserByEmailRepo, getAllUserRepo, getUserByIdRepo } from "./user.repository";

export const findUserByEmailService = async (email: string) => {
  return findUserByEmailRepo(email);
};

export const createUserService = async (data: {
  email: string;
  password: string;
}) => {
  return createUserRepo(data);
};

export const getUserByIdService = async (id: string) => {
  return getUserByIdRepo(id);
};

export const getAllUserService = async () => {
  return getAllUserRepo();
};