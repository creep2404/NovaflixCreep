import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../apis/auth.api";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordApi(email),
  });
};