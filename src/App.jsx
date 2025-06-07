import { Outlet } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import DevRoleSwitcher from './components/DevRoleSwitcher';

const App = () => {
  return (
    <>
      <Outlet />
      <DevRoleSwitcher />
    </>
  );
};

export default App;
