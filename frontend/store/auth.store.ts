import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setAccessToken: (accessToken) => set({ accessToken }),

      clear: () =>
        set({
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        refreshToken: state.refreshToken, // only persist refreshToken
      }),
    },
  ),
);