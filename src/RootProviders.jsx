import { Suspense } from 'react';
import Loader from './components/Loader/Loader';
import { MainProvider } from './context/MainContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { InfoModalProvider } from './context/infoModalContext.jsx';
import { App } from './utils/lazyPages';

const RootProviders = () => (
  <MainProvider>
    <AuthProvider>
      <NotificationProvider>
        <InfoModalProvider>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </InfoModalProvider>
      </NotificationProvider>
    </AuthProvider>
  </MainProvider>
);

export default RootProviders;
