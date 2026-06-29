import { User } from "../shared/types";
import { api } from "./axios";

export const getAllUsers = async () => {
    const res = await api.get<User[]>("/users");
    console.log("AllUsers: ", res);
    return res;
}
