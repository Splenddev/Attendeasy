import { Outlet } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import DevRoleSwitcher from './components/DevRoleSwitcher';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { ConfirmModal } from './components/Modals';

const App = () => {
  const { setShowLogoutModal, showLogoutModal, logout } = useAuth();
  return (
    <>
      <ToastContainer position="top-center" />
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
        actionText="Logout"
        message="You’re about to log out of your account."
      />
      <Outlet />
      <DevRoleSwitcher />
    </>
  );
};

export default App;
