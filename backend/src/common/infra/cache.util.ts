import { redis } from "@/config/redis";

// GET cache
export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

// SET 
export const setCache = async (
  key: string,
  value: any,
  ttl = 60
) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl); //cache sẽ tự expire sau ttl giây
};

// DELETE
export const deleteByPattern = async (pattern: string) => {
  const keys = await redis.keys(pattern);

  if (keys.length) {
    await redis.del(keys);
  }
};

export const withCache = async <T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 60
): Promise<T> => {
  const cached = await getCache<T>(key);
  if (cached) return cached;

  const result = await fn();
  await setCache(key, result, ttl);

  return result;
};