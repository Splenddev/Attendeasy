// hooks/useAttendanceSocket.js
import { useEffect, useRef } from 'react';
import { getSocket } from '../utils/socket';

const useAttendanceSocket = (groupId, handlers = {}) => {
  const handlersRef = useRef(handlers);

  // Keep handlers up to date without reattaching listeners
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !groupId) return;

    socket.emit('joinGroup', String(groupId));

    const boundEvents = {
      'attendance:update': (data) => handlersRef.current?.onUpdate?.(data),
      'attendance:progress': (data) => handlersRef.current?.onProgress?.(data),
      'attendance:flagged': (data) => handlersRef.current?.onFlagged?.(data),
      'attendance:summary': (data) => handlersRef.current?.onSummary?.(data),
      'attendance:deleted': (data) => handlersRef.current?.onDeleted?.(data),
      'attendance:reopened': (data) => handlersRef.current?.onReopened?.(data),
    };

    for (const [event, listener] of Object.entries(boundEvents)) {
      socket.on(event, listener);
    }

    return () => {
      for (const [event, listener] of Object.entries(boundEvents)) {
        socket.off(event, listener);
      }
      socket.emit('leaveGroup', groupId);
    };
  }, [groupId]);

  return null; // optional if used as effect-only
};

export default useAttendanceSocket;
