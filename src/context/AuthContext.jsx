/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { attendance } from '../assets/assets';
import { getUserFromLocalStorageOrAPI } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [navTitle, setNavTitle] = useState('Welcome');
  const [loading, setLoading] = useState(true);
  const [attendanceList, setAttendanceList] = useState(attendance);

  useEffect(() => {
    const syncUser = async () => {
      const storedUser = await getUserFromLocalStorageOrAPI();
      setUser(storedUser); // null or { isLoggedIn: true, role: ..., ... }
      setLoading(false);
    };
    syncUser();
  }, []);

  const logout = () => {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
