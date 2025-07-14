// src/hooks/useGroupSocketListener.js
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../utils/socket';

const useGroupSocketListener = (onNotify) => {
  const { user } = useAuth();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !user?._id) return;

    const handleNotification = (payload) => {
      console.log('📢 group-notification received:', payload);
      onNotify?.(payload);
    };

    socket.on('group-notification', handleNotification);

    return () => {
      socket.off('group-notification', handleNotification);
    };
  }, [user]);

  return null; // or expose socket for more advanced usage
};

export default useGroupSocketListener;
