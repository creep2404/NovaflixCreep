import { createContext, useState, ReactNode } from "react";
import { FilmLoader } from "../components/common/FilmLoader";

type LoadingContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {/* Global loader */}
      {loading && (
        <div className="global-loader">
          <FilmLoader />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};