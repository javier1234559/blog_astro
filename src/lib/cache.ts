// src/lib/cache.ts
import fs from "fs/promises";
import path from "path";

const CACHE_DIR = ".cache";

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl = 3600000
): Promise<T> {
  const cacheFile = path.join(CACHE_DIR, `${key}.json`);

  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const stats = await fs.stat(cacheFile);
    if (Date.now() - stats.mtimeMs < ttl) {
      const cachedData = await fs.readFile(cacheFile, "utf-8");
      return JSON.parse(cachedData);
    }
  } catch (error) {
    // File doesn't exist or is expired, continue to fetch new data
  }

  const data = await fetchFn();
  await fs.writeFile(cacheFile, JSON.stringify(data));
  return data;
}
