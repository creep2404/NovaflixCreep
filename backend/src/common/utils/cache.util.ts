import { redis } from "@/config/redis";

// GET cache
export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

// SET cache
export const setCache = async (
  key: string,
  value: any,
  ttl = 60
) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl); //cache sẽ tự expire sau ttl giây
};

// DELETE pattern
export const deleteByPattern = async (pattern: string) => {
  const keys = await redis.keys(pattern);

  if (keys.length) {
    await redis.del(keys);
  }
};