import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (token: string): string => {
  const decoded = jwtDecode<{ userId: string }>(token);
  return decoded.userId;
};