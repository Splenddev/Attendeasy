// services/scheduleService.js
import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

const SCHEDULE_API_BASE = `${API_BASE}schedule/`;
// const SCHEDULE_API_BASE = `${API_BASE}schedule/`;

export const createSchedule = async (scheduleData) => {
  try {
    const res = await axios.post(`${SCHEDULE_API_BASE}create`, scheduleData, {
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
  const res = await axios.get(`${SCHEDULE_API_BASE}${groupId}`, {
    withCredentials: true, // for cookie auth
  });
  return res.data;
};
