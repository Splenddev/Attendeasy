// src/hooks/useUserSocketListener.js
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../utils/socket';
import { getUser } from '../services/auth.service';

const useUserSocketListener = () => {
  const { updateUser } = useAuth();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleUserRefresh = async () => {
      try {
        const res = await getUser(); // calls /auth/me
        updateUser(res.user);
        console.log('🔁 User updated from server via socket');
      } catch (err) {
        console.warn('Failed to refresh user:', err.message);
      }
    };

    socket.on('user:refresh', handleUserRefresh);

    return () => {
      socket.off('user:refresh', handleUserRefresh);
    };
  }, []);
};

export default useUserSocketListener;
