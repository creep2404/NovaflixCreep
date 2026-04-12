import { api } from "./axios";
import { jwtDecode } from "jwt-decode";

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", payload);

  return res.data;
};

export const registerApi = async (email: string, password: string) => {
  const res = await api.post("/auth/register", {
    email,
    password,
  });

  return res.data;
};

export const getProfileApi = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token");
  }
  const decoded: any = jwtDecode(token);
  console.log("🚀 getProfileApi decoded", decoded);
  const id = decoded?.userId;

  if (!id) throw new Error("Invalid token");
  const res = await api.get(`/users/${id}`);
  console.log("🚀 getProfileApi res: ", res);
  return res.data;
};

export const logoutApi = async (refreshToken: string) => {
  return api.post("/auth/logout", { refreshToken });
};

export const forgotPasswordApi = async (email: string) => {
  return api.post("/auth/forgot-password", { email });
};
