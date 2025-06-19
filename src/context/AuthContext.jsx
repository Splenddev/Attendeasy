/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { attendance } from '../assets/assets';
import { getUserFromLocalStorageOrAPI } from '../utils/auth';
import axios from 'axios';
import { loginUser, registerUser } from '../services/authService';

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [navTitle, setNavTitle] = useState('Welcome');
  const [loading, setLoading] = useState(true);
  const [attendanceList, setAttendanceList] = useState(attendance);
  const [authBtnsLoading, setAuthBtnsLoading] = useState({
    login: false,
    verifyEmail: false,
    resendOtp: false,
    submit: false,
  });

  useEffect(() => {
    const syncUser = async () => {
      const storedUser = await getUserFromLocalStorageOrAPI();
      setUser(storedUser); // null or { isLoggedIn: true, role: ..., ... }
      setLoading(false);
    };
    syncUser();
  }, []);

  const register = async (formData) => {
    try {
      const data = await registerUser(formData);
      return { success: data.success };
    } catch (err) {
      console.error('Register error:', err.message);
      return { success: false, message: err.message };
    } finally {
      setAuthBtnsLoading((prev) => ({ ...prev, submit: false }));
    }
  };
  const login = async (formData = {}) => {
    setAuthBtnsLoading((prev) => ({ ...prev, login: true }));
    try {
      const data = await loginUser(formData);
      return { success: data.success, user: data.user };
    } catch (err) {
      console.error('login error:', err.message);
      return { success: false, message: err.message };
    } finally {
      setAuthBtnsLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const logout = async () => {
    try {
      await axios.post('/app/auth/logout'); // if your server clears cookie here
    } catch (err) {
      console.warn('Logout failed (fallback to client-only):', err.message);
    }
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    setUser,
    navTitle,
    setNavTitle,
    attendanceList,
    setAttendanceList,
    loading,
    logout,
    authBtnsLoading,
    setAuthBtnsLoading,

    register,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
