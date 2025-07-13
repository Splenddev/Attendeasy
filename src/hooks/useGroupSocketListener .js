// src/hooks/useGroupSocketListener.js
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../utils/socket';

const useGroupSocketListener = (onUpdate) => {
  const { user } = useAuth();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !user?._id) return;

    const handleGroupUpdate = (payload) => {
      console.log('📦 group:update socket event', payload);
      onUpdate?.(payload); // Notify component
    };

    socket.on('group:update', handleGroupUpdate);

    return () => {
      socket.off('group:update', handleGroupUpdate);
    };
  }, [user]);
};

export default useGroupSocketListener;
