import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  deleteNotification,
  getMyNotifications,
  markAsRead,
} from '../services/notification.service';
import { connectSocket } from '../utils/socket';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({
    fetch: true,
    markOne: false,
    markAll: false,
    deleteOne: false,
    deleteAll: false,
  });
  const [error, setError] = useState({
    fetch: null,
    markOne: null,
    markAll: null,
    deleteOne: null,
    deleteAll: null,
  });

  // ✅ Fetch user notifications
  const fetchNotifications = async ({ silent = false } = {}) => {
    if (!user?._id) return;
    if (!silent) setLoading((l) => ({ ...l, fetch: true }));

    try {
      const res = await getMyNotifications();
      setNotifications(res.data || []);
      setError((l) => ({ ...l, fetch: null }));
    } catch (err) {
      console.error('🔴 Failed to load notifications:', err);
      if (!silent) toast.error('Could not load notifications.');
      setError((l) => ({ ...l, fetch: err }));
    } finally {
      if (!silent) setLoading((l) => ({ ...l, fetch: false }));
    }
  };

  // ✅ Real-time listeners
  useEffect(() => {
    if (!user?._id) return;

    const socket = connectSocket(user._id);

    const handleNewNotification = () => {
      fetchNotifications({ silent: true });
      toast.info('🔔 New personal notification');
    };

    const handleGroupNotification = (data) => {
      fetchNotifications({ silent: true });
      toast.info(`📢 ${data.title || 'Group Notification'}: ${data.message}`);
    };

    socket.on('notification:new', handleNewNotification);
    socket.on('group-notification', handleGroupNotification);

    return () => {
      socket.off('notification:new', handleNewNotification);
      socket.off('group-notification', handleGroupNotification);
    };
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) fetchNotifications();
  }, [user?._id]);

  // ✅ Mark ALL as read
  const markAllNotificationsAsRead = async () => {
    setLoading((l) => ({ ...l, markAll: true }));
    try {
      await markAsRead();

      const hasUnread = notifications.some((n) => n.unread);
      const targetUnread = hasUnread ? false : true;

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, unread: targetUnread }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      toast.error('Failed to mark all as read');
    } finally {
      setLoading((l) => ({ ...l, markAll: false }));
    }
  };

  // ✅ Mark ONE as read (optional)
  const markNotificationAsRead = async (id) => {
    setLoading((l) => ({ ...l, markOne: true }));
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, unread: !n.unread } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast.error('Failed to mark notification as read');
    } finally {
      setLoading((l) => ({ ...l, markOne: false }));
    }
  };

  // ✅ Delete ONE notification
  const removeNotification = async (id) => {
    setLoading((l) => ({ ...l, deleteOne: true }));
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
      toast.error('Failed to delete notification');
    } finally {
      setLoading((l) => ({ ...l, deleteOne: false }));
    }
  };

  // ✅ Delete ALL notifications
  const removeAllNotifications = async () => {
    setLoading((l) => ({ ...l, deleteAll: true }));
    try {
      await deleteNotification(); // no ID = delete all
      setNotifications([]);
    } catch (err) {
      console.error('Error deleting all notifications:', err);
      toast.error('Failed to delete all notifications');
    } finally {
      setLoading((l) => ({ ...l, deleteAll: false }));
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        fetchNotifications,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        removeNotification,
        removeAllNotifications,
        error,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
