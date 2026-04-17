import Redis from "ioredis";
import { env } from "./env";

export const redis = new Redis({
  //host: env.REDIS_HOST,
  host: "127.0.0.1",
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
});
