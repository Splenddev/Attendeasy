import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roles';
import Loader from '../Loader/Loader';

const InitialRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user?.isNewUser) {
      navigate('/', { replace: true });
    } else if (!user?.isLoggedIn) {
      navigate('/auth/login', { replace: true });
    } else {
      if (user.role === ROLES.CLASS_REP) {
        navigate('/class-rep/dashboard', { replace: true });
      } else if (user.role === ROLES.STUDENT) {
        navigate('/student/dashboard', { replace: true });
      } else {
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  return <Loader />;
};

export default InitialRedirect;
