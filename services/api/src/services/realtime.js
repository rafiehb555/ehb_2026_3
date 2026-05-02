// Realtime helper — fires Socket.IO events if a server is attached, no-op otherwise.
// Attached by ../server-socket.js at startup.

let io = null;

export function attachIo(server) {
  io = server;
}

export function emit(namespace, event, payload) {
  try {
    if (!io) return false;
    const ns = io.of(namespace);
    ns.emit(event, { ...payload, ts: Date.now() });
    return true;
  } catch {
    return false;
  }
}

export function hasIo() {
  return Boolean(io);
}
