/**
 * EHB · Caching Layer (Redis-backed)
 *
 * Wraps hot reads to drastically reduce DB load.
 *
 * Cache keys:
 *   - stl:user:{id}              — STL score (TTL 60s)
 *   - profile:{id}               — public profile (TTL 5 min)
 *   - listings:trending:{country} — trending listings (TTL 1 min)
 *   - industry:multipliers       — industry multipliers (TTL 1 hr)
 *   - country:{code}             — country config (TTL 10 min)
 *
 * Pattern: cache-aside.
 *   1. read cache
 *   2. miss → fetch from source
 *   3. write to cache
 *   4. return value
 */

import { getCache, setCache, delCache } from '../infra/redisClient.js';

const TTL = {
  stl: 60,
  profile: 300,
  listings: 60,
  industry: 3600,
  country: 600,
};

export async function getOrFetch(key, ttlSec, fetchFn) {
  const cached = await getCache(key);
  if (cached !== null) return cached;
  const fresh = await fetchFn();
  if (fresh !== undefined && fresh !== null) {
    setCache(key, fresh, ttlSec).catch(() => {});
  }
  return fresh;
}

export const cache = {
  // STL hot read
  async getStl(userId, fetchFn) {
    return getOrFetch(`stl:user:${userId}`, TTL.stl, fetchFn);
  },
  invalidateStl(userId) {
    return delCache(`stl:user:${userId}`);
  },

  // Profile hot read
  async getProfile(userId, fetchFn) {
    return getOrFetch(`profile:${userId}`, TTL.profile, fetchFn);
  },
  invalidateProfile(userId) {
    return delCache(`profile:${userId}`);
  },

  // Trending listings per country
  async getTrending(country, fetchFn) {
    return getOrFetch(`listings:trending:${country}`, TTL.listings, fetchFn);
  },

  // Industry multipliers (rarely change)
  async getIndustryMultipliers(fetchFn) {
    return getOrFetch('industry:multipliers', TTL.industry, fetchFn);
  },

  // Country config
  async getCountry(code, fetchFn) {
    return getOrFetch(`country:${code}`, TTL.country, fetchFn);
  },

  // Generic
  getOrFetch,
};

export default cache;
