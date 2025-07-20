import api from './api';
const NOTIFICATION_API_BASE = `notifications/`;

export const getMyNotifications = async () => {
  const res = await api.get(NOTIFICATION_API_BASE);
  return res.data;
};

export const markAsRead = async (notificationId) => {
  const endpoint = notificationId
    ? `${NOTIFICATION_API_BASE}${notificationId}`
    : NOTIFICATION_API_BASE;
  const res = await api.patch(endpoint);
  return res.data;
};

export const deleteNotification = async (notificationId) => {
  const endpoint = notificationId
    ? `${NOTIFICATION_API_BASE}${notificationId}`
    : NOTIFICATION_API_BASE;
  const res = await api.delete(endpoint);
  return res.data;
};
