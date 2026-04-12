import { useAuthStore } from "@/store/auth.store";
import { logoutApi } from "../apis/auth.api";

export const useLogout = () => {
  const { refreshToken, clear } = useAuthStore.getState();

  const logout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (err) {}

    clear();
  };

  return logout;
};