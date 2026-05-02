import SerialCounter from '../models/SerialCounter.js';
import { isConnected } from '../config/db.js';

// In-memory counters when DB not connected
const memCounters = new Map();

/**
 * Generate the next franchise serial number.
 * Format: EHB-[CountryCode]-R[Round]-P[Phase]-L[Level]-[NNN]
 *
 * Uses an atomic findOneAndUpdate to prevent race conditions on MongoDB.
 * Falls back to in-memory counters when DB is disconnected.
 */
export async function nextSerial({ country = 'PK', round = 1, phase = 1, level }) {
  if (!level) throw new Error('level is required');
  const key = `${country}-R${round}-P${phase}-${level}`;

  let seq;
  if (isConnected()) {
    const doc = await SerialCounter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    seq = doc.seq;
  } else {
    seq = (memCounters.get(key) || 0) + 1;
    memCounters.set(key, seq);
  }

  const padded = String(seq).padStart(3, '0');
  return {
    serialNumber: `EHB-${country}-R${round}-P${phase}-${level}-${padded}`,
    key,
    seq,
  };
}

/** For tests / admin — peek current seq without incrementing */
export async function peekSerial({ country = 'PK', round = 1, phase = 1, level }) {
  const key = `${country}-R${round}-P${phase}-${level}`;
  if (isConnected()) {
    const doc = await SerialCounter.findOne({ key });
    return doc?.seq || 0;
  }
  return memCounters.get(key) || 0;
}
