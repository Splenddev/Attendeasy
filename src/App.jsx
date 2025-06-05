import { Outlet } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
