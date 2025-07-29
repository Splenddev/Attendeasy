import { Outlet } from 'react-router-dom';
import './StudentLayout.css';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { s_Sidebar } from '../../assets/assets';
import { useMain } from '../../context/MainContext';
import { useAuth } from '../../context/AuthContext';
import { MdAddCard, MdAddComment, MdAddTask } from 'react-icons/md';
import Footer from '../../components/Footer/Footer';
const StudentLayout = () => {
  const { isSideBarMenu, setIsSidebarMenu, isMobile } = useMain();
  const { user } = useAuth();

  return (
    <div
      className={`c-layout ${isMobile && !isSideBarMenu ? 'is-mobile' : ''} ${
        isMobile ? 'mobile' : ''
      }`}>
      <Navbar
        dropdownAssets={[
          {
            name: 'send message',
            icon: MdAddComment,
            path: `/${user.role}/message/`,
          },
          {
            name: 'Mark Attendance',
            icon: MdAddTask,
            path: `/${user.role}/attendance/`,
          },
        ]}
      />
      <SideBar
        components={s_Sidebar}
        menuActive={isSideBarMenu}
        setMenuActive={setIsSidebarMenu}
        isMobile={isMobile}
      />
      <main className={`main s ${isSideBarMenu ? 'move' : ''}`}>
        <Outlet />
      </main>
      <Footer role={user?.role || ''} />
    </div>
  );
};

export default StudentLayout;
