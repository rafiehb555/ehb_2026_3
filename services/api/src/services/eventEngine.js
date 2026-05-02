/**
 * EHB Event Engine
 *
 * Universal event-driven engine. Reads FLOW-SCHEMA.json and dispatches
 * actions per event. Single source for ALL system flows.
 *
 * Usage:
 *   const engine = require('./eventEngine');
 *   engine.register('order.submitted', myHandler);
 *   await engine.emit('order.submitted', { orderId, buyerId, ... });
 */

const fs = require('fs');
const path = require('path');

// =====================================================================
// Load FLOW-SCHEMA.json (single source of truth)
// =====================================================================

const SCHEMA_PATH = path.join(
  __dirname,
  '../../../..',
  'ehb-info/5-specs/FLOW-SCHEMA.json'
);

let schema;
try {
  schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
} catch (err) {
  console.error('[EventEngine] Failed to load FLOW-SCHEMA.json:', err.message);
  schema = { events: {}, constants: {}, flow_state_machines: {} };
}

// =====================================================================
// Event handler registry
// =====================================================================

const handlers = new Map(); // eventName → [handler, ...]

/**
 * Register a handler for an event.
 * @param {string} eventName e.g. "order.submitted"
 * @param {Function} handler async (payload) => void
 */
function register(eventName, handler) {
  if (!handlers.has(eventName)) handlers.set(eventName, []);
  handlers.get(eventName).push(handler);
}

/**
 * Register a default handler for an action (e.g. "wallet.escrow_lock").
 */
const actionHandlers = new Map();
function registerAction(actionName, handler) {
  actionHandlers.set(actionName, handler);
}

/**
 * Emit an event — runs registered handlers + dispatches schema actions.
 * @param {string} eventName e.g. "order.submitted"
 * @param {object} payload event data
 * @returns {object} result { success, actionsRun, errors }
 */
async function emit(eventName, payload = {}) {
  const result = {
    event: eventName,
    timestamp: new Date().toISOString(),
    success: true,
    actionsRun: [],
    errors: [],
  };

  // 1. Run registered handlers (custom code)
  const eventHandlers = handlers.get(eventName) || [];
  for (const handler of eventHandlers) {
    try {
      await handler(payload, result);
    } catch (err) {
      result.errors.push({ source: 'handler', error: err.message });
    }
  }

  // 2. Dispatch schema-defined actions
  const event = schema.events[eventName];
  if (event && event.actions) {
    for (const action of event.actions) {
      const actionFn = actionHandlers.get(action);
      if (actionFn) {
        try {
          await actionFn(payload, result);
          result.actionsRun.push(action);
        } catch (err) {
          result.errors.push({ source: action, error: err.message });
        }
      } else {
        // Action defined in schema but not implemented yet — log
        result.actionsRun.push(`${action} (NOT_IMPLEMENTED)`);
      }
    }
  }

  // 3. Audit log (always)
  if (process.env.EHB_AUDIT_LOG !== 'false') {
    console.log('[EventEngine]', JSON.stringify(result, null, 2));
  }

  result.success = result.errors.length === 0;
  return result;
}

/**
 * Get event definition from schema.
 */
function getEventDef(eventName) {
  return schema.events[eventName] || null;
}

/**
 * Get all known events.
 */
function getAllEvents() {
  return Object.keys(schema.events);
}

/**
 * Get state machine for an entity (order, lock, stl).
 */
function getStateMachine(entityName) {
  return schema.flow_state_machines[entityName] || null;
}

/**
 * Validate state transition.
 */
function isValidTransition(entityName, fromState, toState) {
  const sm = getStateMachine(entityName);
  if (!sm || !sm.transitions) return true; // no rules = allowed
  const allowed = sm.transitions[fromState] || [];
  return allowed.includes(toState);
}

/**
 * Get a constant from schema.
 */
function getConstant(path) {
  const parts = path.split('.');
  let val = schema.constants;
  for (const p of parts) {
    val = val?.[p];
  }
  return val;
}

// =====================================================================
// Default action handlers (stub implementations — extend in real code)
// =====================================================================

// Wallet actions
registerAction('wallet.escrow_lock', async (payload, result) => {
  // TODO: wire to real walletService.escrowLock(orderId, amount)
  result.note = `Would lock ${payload.amount} for order ${payload.orderId}`;
});

registerAction('wallet.release_escrow', async (payload, result) => {
  // TODO: wire to walletService.releaseEscrow
  result.note = `Would release escrow for order ${payload.orderId}`;
});

registerAction('wallet.split_70_10_10_10', async (payload, result) => {
  const total = payload.amount || 0;
  result.distribution = {
    seller: total * 0.70,
    rider: total * 0.10,
    franchise: total * 0.10,
    ehb: total * 0.10,
  };
});

// STL actions
registerAction('stl.recompute', async (payload, result) => {
  const { calculateSTL } = require('./stlService');
  if (payload.pssLevel != null && payload.crbLevel != null && payload.dmoLevel != null) {
    result.stl = calculateSTL(payload);
  }
});

registerAction('stl.update_seller', async (payload, result) => {
  result.note = `Would update seller ${payload.sellerId} STL`;
});

// Notification stubs
registerAction('notification.seller', async (payload) => {
  // TODO: wire to notification service
});
registerAction('notification.buyer', async (payload) => {
  // TODO: wire
});

// Polkadot anchor stub
registerAction('polkadot.anchor', async (payload, result) => {
  // TODO: wire to blockchain service
  result.anchored = `0x${Buffer.from(JSON.stringify(payload)).toString('hex').slice(0, 32)}...`;
});

// =====================================================================
// Export
// =====================================================================

module.exports = {
  register,
  registerAction,
  emit,
  getEventDef,
  getAllEvents,
  getStateMachine,
  isValidTransition,
  getConstant,
  schema, // direct access for advanced use
};
