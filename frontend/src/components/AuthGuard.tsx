import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export default function AuthGuard({ children }: any) {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      navigate("/login");
    }
  }, [accessToken, refreshToken]);

  return children;
}