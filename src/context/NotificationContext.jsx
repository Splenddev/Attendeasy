import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  deleteNotification,
  getMyNotifications,
  markAllAsRead,
} from '../services/notification.service';
import { connectSocket, getSocket } from '../utils/socket';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Load existing notifications
  const fetchNotifications = async () => {
    if (!user?._id) return;

    try {
      const res = await getMyNotifications(user._id);
      setNotifications(res.data || []);
    } catch (err) {
      console.error('🔴 Failed to load notifications:', err);
      toast.error('Could not load notifications.');
    } finally {
      setLoading(false);
    }
  };

  // 🔌 Setup socket connection and listeners
  useEffect(() => {
    if (!user?._id) return;

    const socket = connectSocket(user._id); // ✅ now guaranteed to exist

    const handleNewNotification = (data) => {
      setNotifications((prev) => [data, ...prev]);
      toast.info(data.message || '🔔 New notification received');
    };

    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
    };
  }, [user?._id]);

  // ✅ Mark all notifications as read
  const updateAll = async () => {
    try {
      await markAllAsRead(user._id);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isNew: false, read: true }))
      );
    } catch (err) {
      console.error('Error marking notifications as read:', err);
      toast.error('Failed to mark all as read');
    }
  };

  // ❌ Delete a notification
  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      toast.error('Failed to delete notification');
    }
  };

  const value = {
    notifications,
    loading,
    updateAll,
    removeNotification,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
