import axios from 'axios';
// const API_BASE = 'http://localhost:5000/app/auth/';
const API_BASE = 'https://vigilo-server.onrender.com/app/auth/';
axios.defaults.withCredentials = true;

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // if image is included
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}login`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
export const sendUserOtp = async (email) => {
  const response = await axios.post(`${API_BASE}send-otp`, { email });
  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
export const verifyUserOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(`${API_BASE}verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
