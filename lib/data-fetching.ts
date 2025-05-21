import { cache } from 'react';
import { prisma } from './prisma';
import { logger } from './logger';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

function getCacheKey(key: string): string {
  return `cache:${key}`;
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

export async function fetchWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cacheKey = getCacheKey(key);
  const cached = cacheStore.get(cacheKey);

  if (cached && isCacheValid(cached.timestamp)) {
    logger.debug(`Cache hit for key: ${key}`);
    return cached.data;
  }

  logger.debug(`Cache miss for key: ${key}`);
  const data = await fetchFn();
  cacheStore.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

export const getDisruptions = cache(async (city: string, lineName?: string, station?: string) => {
  try {
    const cacheKey = `disruptions:${city}:${lineName || ''}:${station || ''}`;
    return await fetchWithCache(cacheKey, async () => {
      const disruptions = await prisma.entry.findMany({
        where: {
          city,
          ...(lineName && { lineName }),
          ...(station && { station }),
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      logger.debug(`Fetched ${disruptions.length} disruptions`);
      return disruptions;
    });
  } catch (error) {
    logger.error('Error fetching disruptions', error);
    throw error;
  }
});

export const getLines = cache(async (city: string) => {
  try {
    const cacheKey = `lines:${city}`;
    return await fetchWithCache(cacheKey, async () => {
      const lines = await prisma.line.findMany({
        where: { city },
        orderBy: { order: 'asc' },
      });
      logger.debug(`Fetched ${lines.length} lines`);
      return lines;
    });
  } catch (error) {
    logger.error('Error fetching lines', error);
    throw error;
  }
});

export const getStations = cache(async (city: string, lineName?: string) => {
  try {
    const cacheKey = `stations:${city}:${lineName || ''}`;
    return await fetchWithCache(cacheKey, async () => {
      if (lineName) {
        const line = await prisma.line.findFirst({
          where: { city, name: lineName },
          select: { stations: true },
        });
        if (!line) {
          return [];
        }
        logger.debug(`Fetched ${line.stations.length} stations for line ${lineName}`);
        return line.stations;
      }

      const lines = await prisma.line.findMany({
        where: { city },
        select: { stations: true },
      });

      const uniqueStations = Array.from(
        new Set(lines.flatMap(line => line.stations))
      );
      logger.debug(`Fetched ${uniqueStations.length} unique stations`);
      return uniqueStations;
    });
  } catch (error) {
    logger.error('Error fetching stations', error);
    throw error;
  }
});

export function clearCache(pattern?: string) {
  const keysToDelete = pattern
    ? Array.from(cacheStore.keys()).filter(key => key.includes(pattern))
    : Array.from(cacheStore.keys());

  keysToDelete.forEach(key => cacheStore.delete(key));
  logger.debug(`Cleared ${keysToDelete.length} cache entries`);
}
