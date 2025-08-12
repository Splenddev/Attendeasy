import api from './api';

const INSTANCE_API_BASE = 'schedule-instance/';

export const getScheduleHistory = async (scheduleId) => {
  const res = await api.get(`${INSTANCE_API_BASE}${scheduleId}`);
  return res.data;
};

export const getTodayInstancesForReps = async () => {
  const res = await api.get(`${INSTANCE_API_BASE}rep/today`);
  return res.data;
};
