import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import { refreshTokenApi } from "@/src/apis/auth.api";

export const useAuthInit = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const clear = useAuthStore((s) => s.clear);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refreshTokenApi();

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (err: any) {
        // KHÔNG clear nếu chỉ là chưa login
        if (err?.response?.status !== 400) {
          clear();
        }
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  return { isReady };
};
