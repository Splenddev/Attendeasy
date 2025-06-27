// services/scheduleService.js
import axios from 'axios';

// const API_BASE = 'http://localhost:5000/app/schedule/';
const API_BASE = 'https://vigilo-server.onrender.com/app/schedule/';

export const createSchedule = async (scheduleData) => {
  try {
    const res = await axios.post(`${API_BASE}create`, scheduleData, {
      withCredentials: true, // 🔥 Send cookies
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Schedule creation failed';
    throw new Error(message);
  }
};

export const fetchSchedulesByGroup = async (groupId) => {
  const res = await axios.get(`${API_BASE}${groupId}`, {
    withCredentials: true, // for cookie auth
  });
  return res.data;
};
