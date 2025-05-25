import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/AppRouter.jsx';
import { InfoModalProvider } from './context/infoModalContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InfoModalProvider>
        <RouterProvider router={router} />
      </InfoModalProvider>
    </AuthProvider>
  </StrictMode>
);
