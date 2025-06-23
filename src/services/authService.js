import axios from 'axios';
const API_BASE = 'http://localhost:5000/app/auth/';
// const API_BASE = 'https://vigilo-server.onrender.com/app/auth/';
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

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE}logout`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};

export const sendUserOtp = async (email) => {
  const response = await axios.post(`${API_BASE}send-otp`, { email });
  console.log(email);
  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};

export const verifyUserOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE}verify-otp`, { email, otp });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_BASE}me`, {
      withCredentials: true,
    });
    return await res.data; // should return user object
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
