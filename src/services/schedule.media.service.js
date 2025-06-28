import axios from 'axios';

// const API_BASE = 'http://localhost:5000/app/schedule/';
const API_BASE = 'https://vigilo-server.onrender.com/app/schedule/';

export const uploadScheduleMedia = async (scheduleId, formData, onProgress) => {
  try {
    const response = await axios.post(
      `${API_BASE}${scheduleId}/media`,
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
      `${API_BASE}${scheduleId}/media/${mediaId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Delete failed' };
  }
};
