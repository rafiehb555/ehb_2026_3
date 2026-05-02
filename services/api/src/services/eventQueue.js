/**
 * EHB Event Queue
 *
 * Async queue with retry + dead-letter for the event engine.
 *
 * Features:
 * - Auto-retry with exponential backoff
 * - Dead-letter queue for failed events
 * - Concurrency control
 * - Persistence-ready (swap memory for Redis/RabbitMQ)
 *
 * Usage:
 *   const queue = require('./eventQueue');
 *   await queue.enqueue('order.submitted', payload);
 *   queue.start(); // begin processing
 */

const eventEngine = require('./eventEngine');

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BACKOFF_MS = [1000, 5000, 30000]; // exponential
const DEFAULT_CONCURRENCY = 4;

class EventQueue {
  constructor(options = {}) {
    this.queue = [];           // pending events
    this.processing = new Set(); // currently processing event IDs
    this.deadLetter = [];      // events that exhausted retries
    this.completed = [];        // successfully completed (last 1000)

    this.maxRetries = options.maxRetries || DEFAULT_MAX_RETRIES;
    this.backoff = options.backoff || DEFAULT_BACKOFF_MS;
    this.concurrency = options.concurrency || DEFAULT_CONCURRENCY;

    this.running = false;
    this.subscribers = []; // notification callbacks

    this.metrics = {
      enqueued: 0,
      completed: 0,
      retried: 0,
      failed: 0,
      deadLettered: 0,
    };
  }

  /**
   * Add event to queue.
   */
  async enqueue(eventName, payload, options = {}) {
    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      eventName,
      payload,
      attempts: 0,
      maxRetries: options.maxRetries ?? this.maxRetries,
      enqueuedAt: new Date(),
      nextAttemptAt: new Date(),
      priority: options.priority || 0,
      lastError: null,
    };

    this.queue.push(event);
    this.metrics.enqueued++;

    this.queue.sort((a, b) => b.priority - a.priority);

    if (this.running) this._tick();

    return event.id;
  }

  /**
   * Start processing.
   */
  start() {
    if (this.running) return;
    this.running = true;
    this._tickInterval = setInterval(() => this._tick(), 1000);
    this._tick();
  }

  stop() {
    this.running = false;
    if (this._tickInterval) clearInterval(this._tickInterval);
  }

  /**
   * Process pending events (called by interval).
   */
  async _tick() {
    if (!this.running) return;
    if (this.processing.size >= this.concurrency) return;

    const now = Date.now();
    const ready = this.queue.filter(e => e.nextAttemptAt.getTime() <= now);
    const slots = this.concurrency - this.processing.size;
    const toProcess = ready.slice(0, slots);

    for (const event of toProcess) {
      this.queue = this.queue.filter(e => e.id !== event.id);
      this.processing.add(event.id);
      this._processEvent(event); // fire-and-forget
    }
  }

  async _processEvent(event) {
    event.attempts++;
    try {
      const result = await eventEngine.emit(event.eventName, event.payload);
      if (!result.success) {
        throw new Error(
          `Event errors: ${result.errors.map(e => e.error).join(', ')}`
        );
      }
      this._onSuccess(event, result);
    } catch (err) {
      this._onFailure(event, err);
    } finally {
      this.processing.delete(event.id);
    }
  }

  _onSuccess(event, result) {
    this.metrics.completed++;
    this.completed.push({
      id: event.id,
      eventName: event.eventName,
      attempts: event.attempts,
      completedAt: new Date(),
    });
    if (this.completed.length > 1000) this.completed.shift();
    this._notify('completed', event, result);
  }

  _onFailure(event, err) {
    event.lastError = err.message;
    this.metrics.failed++;

    if (event.attempts >= event.maxRetries) {
      // Dead-letter
      this.deadLetter.push({
        ...event,
        finalError: err.message,
        deadLetteredAt: new Date(),
      });
      this.metrics.deadLettered++;
      this._notify('deadLettered', event, err);
      console.error(`[EventQueue] Dead-lettered ${event.id} (${event.eventName}):`, err.message);
    } else {
      // Retry with backoff
      const backoffMs = this.backoff[event.attempts - 1] || this.backoff[this.backoff.length - 1];
      event.nextAttemptAt = new Date(Date.now() + backoffMs);
      this.queue.push(event);
      this.queue.sort((a, b) => b.priority - a.priority);
      this.metrics.retried++;
      this._notify('retry', event, err);
      console.warn(`[EventQueue] Retry ${event.attempts}/${event.maxRetries} for ${event.eventName} in ${backoffMs}ms`);
    }
  }

  /**
   * Subscribe to lifecycle events.
   */
  onLifecycle(callback) {
    this.subscribers.push(callback);
  }

  _notify(type, event, extra) {
    for (const cb of this.subscribers) {
      try {
        cb({ type, event, extra, timestamp: new Date() });
      } catch (err) {
        console.error('[EventQueue] subscriber error:', err);
      }
    }
  }

  /**
   * Replay dead-lettered event.
   */
  async replay(deadLetterId) {
    const idx = this.deadLetter.findIndex(e => e.id === deadLetterId);
    if (idx === -1) throw new Error(`Dead-letter not found: ${deadLetterId}`);
    const event = this.deadLetter.splice(idx, 1)[0];
    event.attempts = 0;
    event.nextAttemptAt = new Date();
    event.lastError = null;
    this.queue.push(event);
    this._tick();
    return event.id;
  }

  /**
   * Get current queue stats.
   */
  getStats() {
    return {
      pending: this.queue.length,
      processing: this.processing.size,
      deadLetter: this.deadLetter.length,
      completed: this.completed.length,
      metrics: { ...this.metrics },
    };
  }

  // Test helpers
  _reset() {
    this.queue = [];
    this.processing.clear();
    this.deadLetter = [];
    this.completed = [];
    this.metrics = { enqueued: 0, completed: 0, retried: 0, failed: 0, deadLettered: 0 };
  }
}

const queue = new EventQueue();
module.exports = queue;
module.exports.EventQueue = EventQueue;
