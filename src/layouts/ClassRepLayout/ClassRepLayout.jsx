import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { c_Sidebar } from '../../assets/assets';
import './ClassRepLayout.css';
const ClassRepLayout = () => {
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
  return (
    <div
      className={`c-layout ${isMobile && !isSideBarMenu ? 'is-mobile' : ''} ${
        isMobile ? 'mobile' : ''
      }`}>
      <Navbar />
      <SideBar
        components={c_Sidebar}
        menuActive={isSideBarMenu}
        setMenuActive={setIsSidebarMenu}
        isMobile={isMobile}
      />
      <main className={`main ${isSideBarMenu ? 'move' : ''}`}>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default ClassRepLayout;
