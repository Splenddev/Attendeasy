// utils/auth.js
import { getUser } from '../services/auth.service';

export const getUserFromLocalStorageOrAPI = async () => {
  const stored = localStorage.getItem('user');
  if (stored) return JSON.parse(stored);
  try {
    const data = await getUser();
    localStorage.setItem(
      'user',
      JSON.stringify({ ...data.user, isLoggedIn: true })
    );
    const syncedUser = { ...data.user, isLoggedIn: true };
    return syncedUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};
