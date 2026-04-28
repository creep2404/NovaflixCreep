export type JwtPayload = {
  sub: string;
  role: "USER" | "ADMIN" | "PREMIUM";
};