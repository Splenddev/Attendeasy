// hooks/useAttendanceSocket.js
import { useEffect } from 'react';
import { getSocket } from '../utils/socket';

const useAttendanceSocket = (groupId, handlers = {}) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !groupId) return;

    socket.emit('join-room', groupId);

    const events = {
      'attendance:update': handlers.onUpdate,
      'attendance:progress': handlers.onProgress,
      'attendance:flagged': handlers.onFlagged,
      'attendance:summary': handlers.onSummary,
    };

    for (const [event, callback] of Object.entries(events)) {
      if (callback) {
        socket.on(event, callback);
      }
    }

    return () => {
      for (const [event, callback] of Object.entries(events)) {
        if (callback) {
          socket.off(event, callback);
        }
      }
      socket.emit('leave-room', groupId);
    };
  }, [groupId, handlers]);
};

export default useAttendanceSocket;
