/**
 * Redis client — lazy singleton.
 *
 * Used for:
 *   - Session cache
 *   - STL hot-reads
 *   - Idempotency keys
 *   - Rate limiting
 *   - BullMQ queue backend
 */

import { createClient } from 'redis';

let client = null;
let connecting = null;

export async function getRedis() {
  if (client && client.isOpen) return client;
  if (connecting) return connecting;

  connecting = (async () => {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    const c = createClient({ url });
    c.on('error', (err) => console.error('[redis]', err.message));
    await c.connect();
    client = c;
    connecting = null;
    console.log(`[redis] connected to ${url}`);
    return c;
  })();
  return connecting;
}

export async function getCache(key) {
  try {
    const c = await getRedis();
    const v = await c.get(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

export async function setCache(key, value, ttlSec = 300) {
  try {
    const c = await getRedis();
    await c.set(key, JSON.stringify(value), { EX: ttlSec });
    return true;
  } catch {
    return false;
  }
}

export async function delCache(key) {
  try {
    const c = await getRedis();
    await c.del(key);
    return true;
  } catch {
    return false;
  }
}

export async function pingRedis() {
  try {
    const c = await getRedis();
    return await c.ping();
  } catch (err) {
    return null;
  }
}

export default { getRedis, getCache, setCache, delCache, pingRedis };
