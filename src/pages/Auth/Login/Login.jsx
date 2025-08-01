import { FaIdCard, FaKey } from 'react-icons/fa';
import './Login.css';
import { AuthFieldSet } from '../../../components';
import { useState } from 'react';
import button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../../utils/roles';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FiLoader } from 'react-icons/fi';
import LoginRight from './components/LoginRight/LoginRight';

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { user, setUser, login, authBtnsLoading } = useAuth();

  useEffect(() => {
    if (user?.isLoggedIn) {
      if (user.role === ROLES.CLASS_REP) navigate('/class-rep');
      else if (user.role === ROLES.STUDENT) navigate('/student');
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // setIsLoginBtnLoading(true); // if you’re showing a loader

    try {
      const data = await login(formData);

      if (data.success) {
        const { role, ...userData } = data.user;

        const userPayload = { ...userData, role, isLoggedIn: true };
        localStorage.setItem('user', JSON.stringify(userPayload));
        setUser(userPayload);

        // Redirect based on role
        if (userPayload.isNewUser) {
          navigate('/', { replace: true });
        } else if (role === ROLES.CLASS_REP) {
          navigate('/class-rep/dashboard', { replace: true });
        } else if (role === ROLES.STUDENT) {
          navigate('/student/dashboard', { replace: true });
        } else {
          navigate('/unauthorized', { replace: true });
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      // setIsLoginBtnLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <header>
          <img
            src="/vigilo_logo.jpeg"
            alt="logo"
            className="site-logo"
          />
        </header>

        <h2>Welcome Back</h2>
        <p>Please sign in to continue to Vigilo.</p>

        <form
          className="login-form"
          onSubmit={handleLogin}>
          <section>
            {[
              {
                name: 'identifier',
                icon: FaIdCard,
                type: 'text',
                element: 'email / username / matric number',
              },
              {
                name: 'password',
                icon: FaKey,
                type: 'password',
                element: 'password',
              },
            ].map(({ icon, name, element, type }) => (
              <AuthFieldSet
                key={name}
                icon={icon}
                element={element}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            ))}
          </section>

          {error && <p className="error-message">{error}</p>}

          {button.normal({
            element: authBtnsLoading.login ? (
              <FiLoader className="spin" />
            ) : (
              'Sign In'
            ),
            func: null,
            type: 'submit',
            name: 'login-btn',
            disabled: authBtnsLoading.login,
          })}

          {button.normal({
            element: 'Create new account',
            func: () => navigate('/auth/register'),
            name: 'register-btn',
          })}
        </form>
      </div>

      <LoginRight />
    </div>
  );
};

export default Login;
