import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { c_Sidebar } from '../../assets/assets';
import './ClassRepLayout.css';
const ClassRepLayout = () => {
  const [isSideBarMenu, setIsSidebarMenu] = useState(false);
  return (
    <div className="c-layout">
      <Navbar />
      <section>
        <SideBar
          components={c_Sidebar}
          menuActive={isSideBarMenu}
          setMenuActive={setIsSidebarMenu}
        />
      </section>
      <main className={`main ${isSideBarMenu ? 'move' : ''}`}>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default ClassRepLayout;
