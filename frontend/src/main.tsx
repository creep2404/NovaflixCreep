import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query.ts";
import { LoadingProvider } from "./providers/LoadingProvider.tsx";
import { loadTokenFromStorage } from "./auth/token";
import "./apis/interceptors";
import AuthProvider from "./providers/AuthProvider.tsx";

// LoginPage → useLogin → API login
// → lưu token
// → invalidate ["me"]
// → UI update
loadTokenFromStorage();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
