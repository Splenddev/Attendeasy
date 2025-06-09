import { Outlet, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import DevRoleSwitcher from './components/DevRoleSwitcher';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { ROLES } from './utils/roles';

const App = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isLoggedIn) {
      if (user.role === ROLES.CLASS_REP) navigate('/class-rep');
      else if (user.role === ROLES.STUDENT) navigate('/student');
    }
  }, [user, navigate]);
  return (
    <>
      <Outlet />
      <DevRoleSwitcher />
    </>
  );
};

export default App;
