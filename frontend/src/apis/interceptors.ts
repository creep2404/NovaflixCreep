import { api } from "./axios";
import { useAuthStore } from "@/store/auth.store";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  const { accessToken, refreshToken } = useAuthStore.getState();
  
  console.log("🔐 ACCESS TOKEN:", accessToken);
  console.log("🔁 REFRESH TOKEN:", refreshToken);
  // console.log("📡 REQUEST:", config.url);
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // tránh loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const { refreshToken, setTokens, clear } = useAuthStore.getState();

    if (!refreshToken) {
      clear();
      return Promise.reject(error);
    }

    // nếu đang refresh rồi → queue lại
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refreshToken },
      );

      const newAccessToken = res.data.data.accessToken;

      setTokens(newAccessToken, refreshToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      clear();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
