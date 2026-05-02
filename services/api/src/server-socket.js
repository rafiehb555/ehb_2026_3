// Socket.IO bootstrap — wires the realtime helper into a real server.
// Called from index.js once HTTP server exists.

import { Server as IOServer } from 'socket.io';
import { attachIo } from './services/realtime.js';

export function initSocketIo(httpServer) {
  const io = new IOServer(httpServer, {
    cors: { origin: true, credentials: true },
    path: '/socket.io',
  });

  // Namespaces (lazy — they're created on first use via .of())
  const namespaces = ['/dmo', '/orders', '/delivery'];
  for (const ns of namespaces) {
    io.of(ns).on('connection', (socket) => {
      socket.emit('hello', { ns, id: socket.id });
      socket.on('disconnect', () => {});
    });
  }

  attachIo(io);
  return io;
}
