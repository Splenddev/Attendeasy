import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

const NOTIFICATION_API_BASE = `${API_BASE}notifications/`;

export const getMyNotifications = async () => {
  const res = await axios.get(NOTIFICATION_API_BASE, {
    withCredentials: true,
  });
  return res.data;
};

export const markAllAsRead = async () => {
  const res = await axios.patch(
    `${NOTIFICATION_API_BASE}/mark-all-read`,
    null,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteNotification = async (notificationId) => {
  const res = await axios.delete(`${NOTIFICATION_API_BASE}/${notificationId}`, {
    withCredentials: true,
  });
  return res.data;
};
