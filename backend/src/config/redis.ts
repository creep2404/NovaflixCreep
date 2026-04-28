import Redis from "ioredis";
import { env } from "./env";

const redisUrl = env.REDIS_URL;

export const redis = redisUrl
  ? new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    })
  : new Redis({
      host: "127.0.0.1",
      port: Number(env.REDIS_PORT),
      password: env.REDIS_PASSWORD,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});
