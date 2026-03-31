import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import RedisStore, { RedisReply } from "rate-limit-redis";
import { redis } from "@/config/redis";

// helper dùng chung
const createRedisStore = (prefix: string) =>
  new RedisStore({
    prefix,
    sendCommand: (command: string, ...args: any[]) =>
      redis.call(command, ...args) as Promise<any>,
  });

// 🌍 GLOBAL
export const globalLimiter = rateLimit({
  store: createRedisStore("rl:global"),
  windowMs: 15 * 60 * 1000,
  max: (req: any) => {
    const role = req.user?.role;

    if (role === "ADMIN") return 1000;
    if (role === "PREMIUM") return 500;

    return 100;
  },

  keyGenerator: (req) => {
    return req.user?.id ?? ipKeyGenerator(req);
  },
});

// 🔐 AUTH (login/register)
export const authLimiter = rateLimit({
  store: createRedisStore("rl:auth"),
  windowMs: 15 * 60 * 1000,
  max: 10, // max 10 login times
  keyGenerator: (req) => {
    return req.user?.id ?? ipKeyGenerator(req);
  },
  message: {
    success: false,
    message: "Too many login attempts",
  },
});

// ☁️ UPLOAD (S3)
export const uploadLimiter = rateLimit({
  store: createRedisStore("rl:upload"),
  windowMs: 10 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => {
    return req.user?.id ?? ipKeyGenerator(req);
  },
  message: {
    success: false,
    message: "Too many upload requests",
  },
});
