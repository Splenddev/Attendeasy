import axios from 'axios';

const API_BASE = 'https://vigilo-server.onrender.com/app/groups/'; //
// const API_BASE = 'http://localhost:5000/app/groups/';
export const createGroup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}create`, data, {
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
export const fetchGroupService = async (groupId) => {
  try {
    const res = await axios.get(`${API_BASE}find/${groupId}`);
    return { data: res.data, message: res.message };
  } catch (err) {
    console.error('Failed to fetch group:', err.message);
  }
};

export const searchGroupsService = async (params) => {
  const res = await axios.get(`${API_BASE}search`, { params });
  return res.data;
};

export const joinGroupService = async (groupId) => {
  const res = await axios.post(`${API_BASE}${groupId}/join`);
  return res.data;
};

export const cancelJoinRequestService = async (groupId) => {
  const res = await axios.delete(`${API_BASE}${groupId}/join`);
  return res.data;
};
