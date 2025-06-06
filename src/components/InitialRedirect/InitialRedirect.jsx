// src/components/InitialRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';
import Loader from '../Loader/Loader';

const InitialRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. New user -> landing page
    if (user?.isNewUser) {
      navigate('/', { replace: true });
    }
    // 2. Not authenticated
    else if (!user?.isLoggedIn) {
      navigate('/auth/login', { replace: true });
    }
    // 3. Authenticated with role
    else {
      if (user.role === ROLES.CLASS_REP) {
        navigate('/class-rep/dashboard', { replace: true });
      } else if (user.role === ROLES.STUDENT) {
        navigate('/student/dashboard', { replace: true });
      } else {
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [user, navigate]);

  return <Loader />;
};

export default InitialRedirect;
