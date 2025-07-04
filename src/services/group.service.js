import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

// ../services/group.services.js
const GROUP_API_BASE = `${API_BASE}groups/`;
// const GROUP_API_BASE = `${API_BASE}groups/`;

export const fetchGroupService = async (groupId) => {
  try {
    const res = await axios.get(`${GROUP_API_BASE}find/${groupId}`, {
      withCredentials: true,
    });
    return { data: res.data, message: res.data?.message || 'Success' };
  } catch (err) {
    console.error('Failed to fetch group:', err.message);
    throw err.response?.data || { message: 'Failed to fetch group' };
  }
};
export const createGroup = async (data) => {
  try {
    const response = await axios.post(`${GROUP_API_BASE}create`, data, {
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

export const searchGroupsService = async (params) => {
  try {
    const res = await axios.get(`${GROUP_API_BASE}search`, {
      params,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Search groups error:', err.message);
    throw err.response?.data || { message: 'Group search failed' };
  }
};

export const joinGroupService = async (groupId) => {
  try {
    const res = await axios.post(`${GROUP_API_BASE}${groupId}/join`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Join group error:', err.message);
    throw err.response?.data || { message: 'Failed to join group' };
  }
};

export const cancelJoinRequestService = async (groupId) => {
  try {
    const res = await axios.delete(`${GROUP_API_BASE}${groupId}/join`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('Cancel join request error:', err.message);
    throw err.response?.data || { message: 'Failed to cancel join request' };
  }
};

export const approveJoinRequestService = async (groupId, studentId) => {
  try {
    const res = await axios.patch(
      `${GROUP_API_BASE}${groupId}/approve-request/${studentId}`,
      null,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error('Approve join request error:', err.message);
    throw err.response?.data || { message: 'Failed to approve request' };
  }
};

export const rejectJoinRequestService = async (groupId, studentId) => {
  try {
    const res = await axios.patch(
      `${GROUP_API_BASE}${groupId}/reject-request/${studentId}`,
      null,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error('Reject join request error:', err.message);
    throw err.response?.data || { message: 'Failed to reject request' };
  }
};
