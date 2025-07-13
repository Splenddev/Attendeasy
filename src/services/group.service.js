import api from './api'; // central axios instance
const GROUP_API_BASE = `groups/`;

// Fetch specific group
export const fetchGroupService = async (groupId) => {
  const res = await api.get(`${GROUP_API_BASE}find/${groupId}`);
  return { data: res.data, message: res.data?.message || 'Success' };
};

// Create a new group (with image)
export const createGroup = async (data) => {
  const res = await api.post(`${GROUP_API_BASE}create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// Search groups with filters (department, faculty, etc.)
export const searchGroupsService = async (params) => {
  const res = await api.get(`${GROUP_API_BASE}search`, { params });
  return res.data;
};

// Send join request to group
export const joinGroupService = async (groupId) => {
  const res = await api.post(`${GROUP_API_BASE}${groupId}/join`);
  return res.data;
};

// Cancel join request
export const cancelJoinRequestService = async (groupId) => {
  const res = await api.delete(`${GROUP_API_BASE}${groupId}/join`);
  return res.data;
};

// Approve join request
export const approveJoinRequestService = async (groupId, studentId) => {
  const res = await api.patch(
    `${GROUP_API_BASE}${groupId}/approve-request/${studentId}`
  );
  return res.data;
};

// Reject join request
export const rejectJoinRequestService = async (groupId, studentId) => {
  const res = await api.patch(
    `${GROUP_API_BASE}${groupId}/reject-request/${studentId}`
  );
  return res.data;
};

// Leave current group
export const leaveGroupService = async () => {
  const res = await api.post(`${GROUP_API_BASE}leave`);
  return res.data;
};
