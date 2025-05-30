import { Outlet } from 'react-router-dom';
import './StudentLayout.css';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { s_Sidebar } from '../../assets/assets';
import { useMain } from '../../context/MainContext';
import ScrollToTop from '../../components/ScrollToTop';
import { useAuth } from '../../context/AuthContext';
import { MdAddCard, MdAddComment, MdAddTask } from 'react-icons/md';
const StudentLayout = () => {
  const { isSideBarMenu, setIsSidebarMenu, isMobile } = useMain();
  const { user } = useAuth();

  return (
    <div
      className={`c-layout ${isMobile && !isSideBarMenu ? 'is-mobile' : ''} ${
        isMobile ? 'mobile' : ''
      }`}>
      <ScrollToTop />
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
            path: `/${user.role}/message/`,
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
      <footer>footer</footer>
    </div>
  );
};

export default StudentLayout;
