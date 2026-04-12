import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/src/apis/auth.api";
import { useAuthStore } from "@/store/auth.store";

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);

  return useMutation({
    mutationFn: ({ email, password }: any) => loginApi({ email, password }),

    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      console.log("✅ SET TOKEN", accessToken, refreshToken);
      setTokens(accessToken, refreshToken);
    },
    onError: (error) => {
      console.log("ERROR useLogin", error);
    },
  });
};
