import { getCache, setCache } from "../infra/cache.util";
import { getPresignedDownloadUrl } from "../infra/s3-upload.util";

const PRESIGNED_TTL = 60 * 5; // 5 phút

export const getCachedPresignedUrl = async (key: string) => {
  const cacheKey = `presigned:${key}`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const url = await getPresignedDownloadUrl(key);

  await setCache(cacheKey, url, PRESIGNED_TTL);

  return url;
};