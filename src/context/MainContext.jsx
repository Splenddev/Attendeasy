/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { attendance } from '../assets/assets';
const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: 'student',
    name: 'splendid felix',
  });
  const [navTitle, setNavTitle] = useState('Welcome');

  const [attendanceList, setAttendanceList] = useState(attendance);
  const [isMobile, setIsMobile] = useState(null);
  const [screen, setScreen] = useState(null);
  const [isSideBarMenu, setIsSidebarMenu] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    setIsMobile(screen <= 768);
    return () => window.removeEventListener('resize', handleResize);
  }, [screen]);
  // const filtered = attendanceList.filter((item) => {item.DateCreated})
  const value = {
    user,
    setUser,
    navTitle,
    setNavTitle,
    attendanceList,
    setAttendanceList,
    isSideBarMenu,
    setIsSidebarMenu,
    isMobile,
    setIsMobile,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMain = () => useContext(MainContext);
