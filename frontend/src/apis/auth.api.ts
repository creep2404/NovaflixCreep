import { useAuthStore } from "@/src/features/auth/store/auth.store";
import { api } from "./axios";
import { getUserIdFromToken } from "@/src/features/auth/utils/jwt";
import { AuthResponse } from "@/src/shared/types";

export const loginApi = async (payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return await api.post("/auth/login", payload);
};

export const registerApi = async (email: string, password: string) =>
  await api.post("/auth/register", {
    email,
    password,
  });

export const getProfileApi = async () => {
  const token = useAuthStore.getState().accessToken;

  if (!token) throw new Error("No token");

  const id = getUserIdFromToken(token);

  if (!id) throw new Error("Invalid token");
  const res = await api.get(`/users/${id}`);
  return res;
};

export const logoutApi = async () => await api.post("/auth/logout");

export const forgotPasswordApi = async (email: string) =>
  await api.post("/auth/forgot-password", { email });

export const refreshTokenApi = async () => await api.post("/auth/refresh");
