import api from './api';
const MEDIA_API_BASE = `schedule/`;

export const uploadScheduleMedia = async (scheduleId, formData, onProgress) => {
  const res = await api.post(`${MEDIA_API_BASE}${scheduleId}/media`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
  return res.data;
};

export const deleteScheduleMedia = async (scheduleId, mediaId) => {
  const res = await api.delete(
    `${MEDIA_API_BASE}${scheduleId}/media/${mediaId}`
  );
  return res.data;
};
