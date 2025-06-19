// utils/auth.js
import axios from 'axios';

export const getUserFromLocalStorageOrAPI = async () => {
  const stored = localStorage.getItem('user');
  if (stored) return JSON.parse(stored);
  try {
    const { data } = await axios.get('/app/auth/me', { withCredentials: true });
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    return null;
  }
};
