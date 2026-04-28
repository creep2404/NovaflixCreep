import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, registerApi, getProfileApi, logoutApi } from "@/src/apis/auth.api";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  // 🔐 LOGIN
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("🚀 loginMutation:", data);

      const { accessToken } = data;
      setAccessToken(accessToken);
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
  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.error(e);
    } finally {
      clear();
      navigate("/login");
    }
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
