/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { attendance } from '../assets/assets';
import { getUserFromLocalStorageOrAPI } from '../utils/auth';
import axios from 'axios';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.service';
import { toast } from 'react-toastify';
import { connectSocket } from '../utils/socket';
import { joinGroupRoom, leaveGroupRoom } from '../utils/socketRooms';

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
    logout: false,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      const storedUser = await getUserFromLocalStorageOrAPI();

      // 🔁 If user has no group, try syncing from server anyway
      if (!storedUser?.group && storedUser?._id) {
        try {
          const fresh = await getUser();
          updateUser(fresh.user);
          return;
        } catch (err) {
          console.error('❌ Failed to refresh user from API:', err);
        }
      }

      setUser(storedUser);
      setLoading(false);
    };
    syncUser();
  }, []);

  useEffect(() => {
    if (user?._id && user.group) {
      joinGroupRoom(user.group);
      return () => leaveGroupRoom(user.group);
    }
  }, [user?._id, user?.group]);

  useEffect(() => {
    if (user?._id && user?.group) {
      joinGroupRoom(user.group);
      return () => leaveGroupRoom(user.group);
    }
  }, [user?._id, user?.group]);

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
    setAuthBtnsLoading((prev) => ({ ...prev, logout: true }));
    try {
      const data = await logoutUser();
      if (data.success) {
        localStorage.removeItem('user');
        setUser(null);
        toast.success(data.message);
        setShowLogoutModal(false);
      }
    } catch (err) {
      console.warn('Logout failed (fallback to client-only):', err.message);
      toast.warn(err?.response?.message || 'Logout failed');
    } finally {
      setAuthBtnsLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const updateUser = (syncedUser) => {
    const updated = { ...syncedUser, isLoggedIn: true };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
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
    updateUser,
    register,
    login,
    showLogoutModal,
    setShowLogoutModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
