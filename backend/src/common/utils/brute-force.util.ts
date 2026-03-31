import { redis } from "@/config/redis";

const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 60 * 5; // 5 minutes

export const checkLoginAttempts = async (key: string) => {
  const attempts = await redis.get(key);

  if (attempts && Number(attempts) >= MAX_ATTEMPTS) {
    return false; // block login
  }

  return true;
};

export const increaseLoginAttempts = async (key: string) => {
  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, BLOCK_TIME);
  }
};

export const resetLoginAttempts = async (key: string) => {
  await redis.del(key);
};