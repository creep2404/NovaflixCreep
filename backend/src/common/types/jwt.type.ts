import { UserRole } from "./role";

export type JwtPayload = {
  sub: string;
  role: UserRole;
};