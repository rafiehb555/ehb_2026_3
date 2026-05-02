import Notification from '../models/Notification.js';
import { isConnected } from '../config/db.js';
import { emit as emitRealtime } from './realtime.js';

export async function notify({ userId, category, title, body, severity = 'info', link, meta }) {
  if (!userId) return null;
  let doc = { userId, category, title, body, severity, link, meta, read: false, createdAt: new Date() };
  if (isConnected()) {
    const n = await Notification.create(doc);
    doc = n.toObject();
  }
  emitRealtime(`/user/${userId}`, 'notification:new', doc);
  emitRealtime('/dmo', 'notification:new', doc);
  return doc;
}

export async function listMy(userId, { unreadOnly, limit = 50 } = {}) {
  if (!isConnected()) return [];
  const q = { userId };
  if (unreadOnly) q.read = false;
  return Notification.find(q).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function markRead(notificationId, userId) {
  if (!isConnected()) return null;
  const n = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { read: true, readAt: new Date() },
    { new: true }
  );
  return n?.toObject();
}

export async function markAllRead(userId) {
  if (!isConnected()) return { modified: 0 };
  const r = await Notification.updateMany(
    { userId, read: false },
    { read: true, readAt: new Date() }
  );
  return { modified: r.modifiedCount };
}

export async function unreadCount(userId) {
  if (!isConnected()) return 0;
  return Notification.countDocuments({ userId, read: false });
}
