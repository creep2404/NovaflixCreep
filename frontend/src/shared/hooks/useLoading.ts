import { useContext } from "react";
import { LoadingContext } from "@/src/providers/LoadingProvider";

export const useLoading = () => {
  return useContext(LoadingContext);
};