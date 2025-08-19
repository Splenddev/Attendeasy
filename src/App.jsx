import { Navigate, Outlet, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/default.css';

import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { ConfirmModal } from './components/Modals';
import JoinGroupPrompt from './components/Prompts/JoinGroupPrompt';
import ErrorModal from './components/Modals/ErrorModal/ErrorModal';
import useUserSocketListener from './hooks/useUserSocketListener';
import SuccessModal from './components/Modals/SuccessModal/SuccessModal';
import 'nprogress/nprogress.css';
import NavigationProgress from './components/NavigationProgress';
import ScrollToTop from './components/ScrollToTop';

import useCourses from './hooks/useCourses';
import AddCoursePrompt from './components/Prompts/AddCoursePrompt';
import Loader from './components/Loader/Loader';

const App = () => {
  const {
    setShowLogoutModal,
    showLogoutModal,
    logout,
    authBtnsLoading,
    user,
    loading: authLoading,
  } = useAuth();

  useUserSocketListener();

  const role = user?.role?.toLowerCase();
  const location = useLocation();

  const isOnGroupPage = location.pathname.startsWith(
    `/${role}/group-management`
  );
  const isOnCoursesPage = location.pathname.startsWith(`/${role}/courses`);

  const userLoaded = user !== undefined;

  const shouldShowJoinGroupPrompt =
    userLoaded && user?.isLoggedIn && !user?.group && !isOnGroupPage;

  const {
    courses,
    loading: courseLoading,
    error,
  } = useCourses(user?.role === 'class-rep');

  const shouldPromptAddCourse =
    user?.isLoggedIn &&
    user?.role === 'class-rep' &&
    user?.group &&
    !isOnGroupPage &&
    !isOnCoursesPage &&
    !courseLoading &&
    courses &&
    courses.length === 0 &&
    error;

  if (authLoading || courseLoading) return <Loader />;
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
      {shouldShowJoinGroupPrompt ? (
        <JoinGroupPrompt role={role} />
      ) : shouldPromptAddCourse ? (
        <AddCoursePrompt />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default App;
