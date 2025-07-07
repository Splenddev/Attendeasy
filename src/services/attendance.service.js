import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';
const ATTENDANCE_API_BASE = `${API_BASE}attendance/`;
// const ATTENDANCE_API_BASE = `${API_BASE}attendance/`;
// Create new attendance session
export const createAttendance = async (payload) => {
  const res = await axios.post(`${ATTENDANCE_API_BASE}create`, payload);
  return res.data;
};

// Get all attendance sessions for a group
export const getGroupAttendances = async (groupId) => {
  const res = await axios.get(`${ATTENDANCE_API_BASE}groups/${groupId}`);
  return res.data;
};

// Get single attendance session
export const getAttendanceById = async (attendanceId) => {
  const res = await axios.get(
    `${ATTENDANCE_API_BASE}api/attendance/${attendanceId}`
  );
  return res.data;
};

// Mark attendance (student)
export const markAttendance = async ({ attendanceId, payload }) => {
  const res = await axios.post(
    `${ATTENDANCE_API_BASE}api/attendance/mark/${attendanceId}`,
    payload
  );
  return res.data;
};

// Submit absence plea
export const submitAbsencePlea = async ({ attendanceId, payload }) => {
  const res = await axios.post(
    `${ATTENDANCE_API_BASE}api/attendance/plea/${attendanceId}`,
    payload
  );
  return res.data;
};
