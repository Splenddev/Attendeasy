/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { attendance } from '../assets/assets';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: 'student',
    name: 'splendid felix',
  });
  const [navTitle, setNavTitle] = useState('Welcome');

  const [attendanceList, setAttendanceList] = useState(attendance);

  // const filtered = attendanceList.filter((item) => {item.DateCreated})
  const value = {
    user,
    setUser,
    navTitle,
    setNavTitle,
    attendanceList,
    setAttendanceList,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
