export const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  PREMIUM: "PREMIUM",
} as const;

export type UserRole = (typeof ROLE)[keyof typeof ROLE];