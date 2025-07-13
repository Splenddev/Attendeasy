import api from './api';
const NOTIFICATION_API_BASE = `notifications/`;

export const getMyNotifications = async () => {
  const res = await api.get(NOTIFICATION_API_BASE);
  return res.data;
};

export const markAllAsRead = async () => {
  const res = await api.patch(`${NOTIFICATION_API_BASE}mark-all-read`);
  return res.data;
};

export const deleteNotification = async (notificationId) => {
  const res = await api.delete(`${NOTIFICATION_API_BASE}${notificationId}`);
  return res.data;
};
