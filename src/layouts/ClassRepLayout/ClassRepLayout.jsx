import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/ClassRepComponents/Navbar/Navbar';
import SideBar from '../../components/ClassRepComponents/SideBar/SideBar';
import { c_Sidebar } from '../../assets/assets';
import './ClassRepLayout.css';
import { useAuth } from '../../context/AuthContext';
import { FaPlus } from 'react-icons/fa';
import { useMain } from '../../context/MainContext';
import Footer from '../../components/Footer/Footer';
import { useScheduleInstance } from '../../hooks/useScheduleInstance';
import { useEffect } from 'react';
import TodaysInstancesPrompt from '../../components/Prompts/TodaysInstancesPrompt/TodaysInstancesPrompt';
const ClassRepLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const day = new Date().getDay();
  const { isSideBarMenu, setIsSidebarMenu, isMobile } = useMain();
  const dropdownAssets = [
    {
      name: 'new schedule',
      icon: FaPlus,
      path: `/${user.role}/schedules/create`,
    },
  ];

  const { fetchTodaysInstances, data } = useScheduleInstance();

  useEffect(() => {
    if (!user._id) return;
    console.log(data);
    fetchTodaysInstances();
  }, [user._id, day]);

  const { promptMessage = '', instances = [] } = data || {};

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
        <TodaysInstancesPrompt
          instances={instances}
          promptMessage={promptMessage}
          onConfirm={(id) =>
            navigate(`/class-rep/schedules/${id}/history`, {
              state: { tab: 'unconfirmed' },
            })
          }
        />
        <Outlet />
      </main>
      <Footer role={user.role || 'class-rep'} />
    </div>
  );
};

export default ClassRepLayout;
