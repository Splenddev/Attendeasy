import { Outlet, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/default.css';

import DevRoleSwitcher from './components/DevRoleSwitcher';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { ConfirmModal } from './components/Modals';
import JoinGroupPrompt from './components/JoinGroupPrompt/JoinGroupPrompt';
import ErrorModal from './components/Modals/ErrorModal/ErrorModal';
import useUserSocketListener from './hooks/useUserSocketListener ';
import SuccessModal from './components/Modals/SuccessModal/SuccessModal';
import 'nprogress/nprogress.css';
import NavigationProgress from './components/NavigationProgress';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const { setShowLogoutModal, showLogoutModal, logout, authBtnsLoading, user } =
    useAuth();

  useUserSocketListener();

  const role = user?.role?.toLowerCase();
  const location = useLocation();

  const isOnGroupPage = location.pathname.startsWith(
    `/${role}/group-management`
  );

  const shouldShowJoinGroupPrompt =
    user?.isLoggedIn && !user?.group && !isOnGroupPage;

  return (
    <>
      <NavigationProgress />
      <ScrollToTop />
      <ToastContainer position="top-center" />

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
        loader={authBtnsLoading.logout}
        actionText="Logout"
        message="You’re about to log out of your account."
      />
      <SuccessModal />
      <ErrorModal />

      {shouldShowJoinGroupPrompt ? <JoinGroupPrompt role={role} /> : <Outlet />}

      <DevRoleSwitcher />
    </>
  );
};

export default App;
