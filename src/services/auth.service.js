import api from './api';
const AUTH_API_BASE = `auth/`;

export const registerUser = async (formData) => {
  const res = await api.post(`${AUTH_API_BASE}register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await api.post(`${AUTH_API_BASE}login`, formData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post(`${AUTH_API_BASE}logout`);
  return res.data;
};

export const sendUserOtp = async (email) => {
  const res = await api.post(`${AUTH_API_BASE}send-otp`, { email });
  return res.data;
};

export const verifyUserOtp = async (email, otp) => {
  const res = await api.post(`${AUTH_API_BASE}verify-otp`, { email, otp });
  return res.data;
};

export const getUser = async () => {
  const res = await api.get(`${AUTH_API_BASE}me`);
  return res.data;
};
