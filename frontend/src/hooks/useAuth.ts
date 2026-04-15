import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, registerApi, getProfileApi } from "@/src/apis/auth.api";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const { accessToken, refreshToken } = useAuthStore.getState();

  // 🔐 LOGIN
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("🚀 data:", data);
      const { accessToken, refreshToken } = data;
      setTokens(accessToken, refreshToken);
    },
  });

  // 📝 REGISTER
  const registerMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return registerApi(data.email, data.password);
    },
  });

  // 👤 PROFILE
  const profileQuery = useQuery({
    queryKey: ["me"],
    queryFn: getProfileApi,
    enabled: !!accessToken,
  });

  // 🚪 LOGOUT
  const logout = () => {
    useAuthStore.getState().clear();
    window.location.href = "/login";
  };

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    profile: profileQuery?.data,
    isLoadingProfile: profileQuery.isLoading,

    logout,
  };
};
