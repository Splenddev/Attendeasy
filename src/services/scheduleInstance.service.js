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

export const updateInstances = async ({
  id,
  classStatus,
  rescheduledToDate,
  updatedTime,
  lecturerMessage,
}) => {
  const payload = { classStatus };
  if (rescheduledToDate) payload.rescheduledToDate = rescheduledToDate;
  if (updatedTime) payload.updatedTime = updatedTime;
  if (lecturerMessage) payload.lecturerMessage = lecturerMessage;

  const response = await api.patch(`${INSTANCE_API_BASE}${id}/status`, payload);
  return response.data;
};
