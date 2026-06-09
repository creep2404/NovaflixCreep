import { getAllUsers } from "@/src/apis/user.api";
import { User } from "@/src/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};