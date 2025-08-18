import { MainProvider } from './context/MainContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { InfoModalProvider } from './context/infoModalContext';
import App from './App';

const RootProviders = () => (
  <MainProvider>
    <AuthProvider>
      <NotificationProvider>
        <InfoModalProvider>
          <App />
        </InfoModalProvider>
      </NotificationProvider>
    </AuthProvider>
  </MainProvider>
);

export default RootProviders;
