import api from './api';

const ATTENDANCE_API_BASE = `attendance/`;

// Create new attendance session
export const createAttendance = async (payload) => {
  const res = await api.post(`${ATTENDANCE_API_BASE}create`, payload);
  return res.data;
};

// Get all attendance sessions for a group
export const getGroupAttendances = async (groupId) => {
  const res = await api.get(`${ATTENDANCE_API_BASE}groups/${groupId}`);
  return res.data;
};

export const getGroupTabAttendances = async (groupId) => {
  const res = await api.get(`${ATTENDANCE_API_BASE}group-tab/${groupId}`);
  return res.data;
};

// Get single attendance session
export const getAttendanceById = async (attendanceId) => {
  const res = await api.get(`${ATTENDANCE_API_BASE}${attendanceId}`);
  return res.data;
};

// Mark attendance (student)
export const markAttendance = async ({ attendanceId, payload }) => {
  const res = await api.post(
    `${ATTENDANCE_API_BASE}mark/${attendanceId}`,
    payload
  );
  return res.data;
};

// Submit absence plea
export const submitAbsencePlea = async ({ attendanceId, payload }) => {
  const res = await api.post(
    `${ATTENDANCE_API_BASE}plea/${attendanceId}`,
    payload
  );
  return res.data;
};

// Mark geolocation-based entry
export const markGeoEntry = async (
  attendanceId,
  userLocation = {},
  mode = 'checkIn'
) => {
  const res = await api.post(
    `${ATTENDANCE_API_BASE}mark-entry/${attendanceId}`,
    {
      method: 'geo',
      mode,
      time: new Date(),
      location: {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      },
    }
  );

  return res.data;
};
export const finalizeSession = async (attendanceId) => {
  const res = await api.post(`${ATTENDANCE_API_BASE}finalize/${attendanceId}`);

  return res.data;
};
export const reopenSession = async (attendanceId, payload) => {
  const res = await api.post(
    `${ATTENDANCE_API_BASE}re-open/${attendanceId}`,
    payload
  );

  return res.data;
};
export const deleteSession = async (attendanceId) => {
  const res = await api.delete(`${ATTENDANCE_API_BASE}${attendanceId}`);

  return res.data;
};
