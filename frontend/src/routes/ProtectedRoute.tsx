import { useAuthStore } from "@/store/auth.store";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const { accessToken } = useAuthStore();
  const location = useLocation();
  console.log("🚀 ProtectedRoute accessToken", accessToken);
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};
