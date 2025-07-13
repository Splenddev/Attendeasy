import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  deleteNotification,
  getMyNotifications,
  markAllAsRead,
} from '../services/notification.service';
import { connectSocket } from '../utils/socket';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // ⏳ first fetch loading only

  // ✅ Fetch notifications (can be used silently or with loader)
  const fetchNotifications = async ({ silent = false } = {}) => {
    if (!user?._id) return;

    if (!silent) setLoading(true); // only show loader on first fetch

    try {
      const res = await getMyNotifications(user._id);
      setNotifications(res.data || []);
    } catch (err) {
      console.error('🔴 Failed to load notifications:', err);
      if (!silent) toast.error('Could not load notifications.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // 🔌 Setup socket listener
  useEffect(() => {
    if (!user?._id) return;

    const socket = connectSocket(user._id);

    const handleNewNotification = () => {
      // ✅ Silently refetch to ensure up-to-date list
      fetchNotifications({ silent: true });
      // (Optional) also toast — or show minimal UI cue
      toast.info('🔔 New notification received');
    };

    socket.on('notification:new', handleNewNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
    };
  }, [user?._id]);

  // ✅ Initial load
  useEffect(() => {
    if (user?._id) {
      fetchNotifications(); // loader shown only here
    }
  }, [user?._id]);

  // ✅ Mark all as read
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

  // ✅ Delete one notification
  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      toast.error('Failed to delete notification');
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        updateAll,
        removeNotification,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
