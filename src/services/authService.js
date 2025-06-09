import axios from 'axios';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/app/auth/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // if image is included
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      // 'http://vigilo-server.onrender.com/app/auth/login',
      'https://vigilo-server.onrender.com/app/auth/login',
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: 'Server error' };
  }
};
