import { createContext, useState, ReactNode } from "react";
import ProjectorLoader from "@/src/shared/components/ui/loading/ProjectorLoader";

type LoadingContextType = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const showLoading = () => {
    setCount((c) => c + 1);
  };

  const hideLoading = () => {
    setCount((c) => Math.max(0, c - 1));
  };

  const loading = count > 0;

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {loading && (
        <div className="global-loader">
          <ProjectorLoader />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};
