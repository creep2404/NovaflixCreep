import { ReactNode } from "react";
import { useAuthInit } from "@/src/features/auth/hooks/useAuthInit";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isReady } = useAuthInit();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading... Auth
      </div>
    );
  }

  return <>{children}</>;
}
