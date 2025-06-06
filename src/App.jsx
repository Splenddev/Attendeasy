import { Outlet } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import DevRoleSwitcher from './components/DevRoleSwitcher';
import Footer from './components/Footer/Footer';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Outlet />
      <DevRoleSwitcher />
      <Footer role={user.role} />
    </>
  );
};

export default App;
