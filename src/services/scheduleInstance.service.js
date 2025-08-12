import api from './api';

const INSTANCE_API_BASE = 'schedule-instance/';

export const getScheduleHistory = async (scheduleId) => {
  const res = await api.get(`${INSTANCE_API_BASE}${scheduleId}`);
  return res.data;
};
