// useAttendanceSocket.js
import { useEffect } from 'react';
import { getSocket } from '../utils/socket';

const useAttendanceSocket = (groupId, onChange) => {
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !groupId) return;

    const handleUpdate = (data) => {
      console.log('📡 Attendance update received:', data);
      onChange?.(data); // Triggers API refetch
    };

    socket.on('attendance:update', handleUpdate);

    return () => {
      socket.off('attendance:update', handleUpdate);
    };
  }, [groupId]);
};

export default useAttendanceSocket;
