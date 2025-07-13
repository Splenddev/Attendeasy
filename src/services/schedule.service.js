import api from './api';
const SCHEDULE_API_BASE = `schedule/`;

export const createSchedule = async (scheduleData) => {
  const res = await api.post(`${SCHEDULE_API_BASE}create`, scheduleData);
  return res.data;
};

export const fetchSchedulesByGroup = async (groupId) => {
  const res = await api.get(`${SCHEDULE_API_BASE}${groupId}`);
  return res.data;
};
