import { Outlet } from 'react-router-dom';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { c_Sidebar } from '../../assets/assets';
import './ClassRepLayout.css';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaPlus, FaUserEdit } from 'react-icons/fa';
import { useMain } from '../../context/MainContext';
import Footer from '../../components/Footer/Footer';
const ClassRepLayout = () => {
  const { user } = useAuth();
  const { isSideBarMenu, setIsSidebarMenu, isMobile } = useMain();
  const dropdownAssets = [
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
      <Footer role={user.role || 'class-rep'} />
    </div>
  );
};

export default ClassRepLayout;
