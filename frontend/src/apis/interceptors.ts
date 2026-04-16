import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshTokenApi } from "./auth.api";
import { instance } from "./axios";
import { useAuthStore } from "@/store/auth.store";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

// REQUEST
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  console.log("🚀 accessToken test:", accessToken);

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// RESPONSE
instance.interceptors.response.use(
  (response) => {
    // unwrap
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const { setAccessToken, clear } = useAuthStore.getState();

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const data = await refreshTokenApi();
      const newAccessToken = data.accessToken;

      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;

      return instance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      clear();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
