import axios from 'axios';

const API_BASE = 'https://vigilo-server.onrender.com/app/groups/create';
export const createGroup = async (data) => {
  try {
    const response = await axios.post(API_BASE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Create group error:', error);
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fetchGroupService = async ({ groupId }) => {
  try {
    const res = await axios.get(`/app/groups/${groupId}`);
    return { data: res.data, message: res.message };
  } catch (err) {
    console.error('Failed to fetch group:', err.message);
  }
};
