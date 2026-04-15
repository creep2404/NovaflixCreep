import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { refreshTokenApi } from "../apis/auth.api";

export const useAuthInit = () => {
  const { refreshToken, setAccessToken, clear } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (!refreshToken) {
        setIsReady(true);
        return;
      }

      try {
        const data = await refreshTokenApi(refreshToken);
        const newAccessToken = data.accessToken;

        setAccessToken(newAccessToken);
      } catch (err) {
        clear(); // refresh fail → logout
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  return { isReady };
};
