import {
  createUserRepo,
  findUserByEmailRepo,
  getAllUserRepo,
  findUserByIdRepo,
} from "./user.repository";

export const findUserByEmailService = async (email: string) => {
  if (!email) throw new Error("Email is required");
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error("User not found");

  return user;
};

export const createUserService = async (data: {
  email: string;
  password: string;
}) => {
  return await createUserRepo(data);
};

export const getUserByIdService = async (id: string) => {
  if (!id) throw new Error("User ID is required");

  const user = await findUserByIdRepo(id);

  if (!user) throw new Error("User not found");

  return user;
};

export const getAllUserService = async () => {
  return await getAllUserRepo();
};
