import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

const MEDIA_API_BASE = `${API_BASE}schedule/`;
// const MEDIA_API_BASE = `${API_BASE}schedule/`;

export const uploadScheduleMedia = async (scheduleId, formData, onProgress) => {
  try {
    const response = await axios.post(
      `${MEDIA_API_BASE}${scheduleId}/media`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (e) => {
          if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Upload failed' };
  }
};

export const deleteScheduleMedia = async (scheduleId, mediaId) => {
  try {
    const response = await axios.delete(
      `${MEDIA_API_BASE}${scheduleId}/media/${mediaId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Delete failed' };
  }
};
