import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

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
        console.log("🔁 Path:",  `${import.meta.env.VITE_API_URL}/auth/refresh`);
        console.log("🔁 REFRESH TOKEN:", refreshToken);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.data.accessToken;

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