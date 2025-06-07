import { Outlet } from 'react-router-dom';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { c_Sidebar } from '../../assets/assets';
import './ClassRepLayout.css';
import ScrollToTop from '../../components/ScrollToTop';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaPlus, FaUserEdit } from 'react-icons/fa';
import { MdContactSupport } from 'react-icons/md';
import { useMain } from '../../context/MainContext';
import Footer from '../../components/Footer/Footer';
const ClassRepLayout = () => {
  const { user } = useAuth();
  const { isSideBarMenu, setIsSidebarMenu, isMobile } = useMain();
  const dropdownAssets = [
    {
      name: 'new attendance',
      icon: FaPlus,
      path: `/${user.role}/attendance/create`,
    },
    {
      name: 'new schedule',
      icon: FaPlus,
      path: `/${user.role}/schedules/create`,
    },
  ];
  return (
    <div
      className={`c-layout ${isMobile && !isSideBarMenu ? 'is-mobile' : ''} ${
        isMobile ? 'mobile' : ''
      }`}>
      <ScrollToTop /> {/* 👈 Place it here */}
      <Navbar dropdownAssets={dropdownAssets} />
      <SideBar
        components={c_Sidebar}
        menuActive={isSideBarMenu}
        setMenuActive={setIsSidebarMenu}
        isMobile={isMobile}
      />
      <main className={`main ${isSideBarMenu ? 'move' : ''}`}>
        <Outlet />
      </main>
      <Footer role={user.role} />
    </div>
  );
};

export default ClassRepLayout;
