import { FaIdCard, FaKey } from 'react-icons/fa';
import './Login.css';
import { AuthFieldSet } from '../../../components';
import { useState } from 'react';
import { MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import button from '../../../components/Button/Button';
import img from '../../../assets/splendid.png';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../../utils/roles';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const dummyUsers = [
  {
    id: '1',
    identifier: 'rep123@gmail.com',
    password: '1234',
    role: ROLES.CLASS_REP,
    isNewUser: false,
    name: 'Splendid James',
  },
  {
    id: '2',
    identifier: 'student456',
    password: 'abcd',
    role: ROLES.STUDENT,
    isNewUser: false,
  },
  {
    id: '3',
    identifier: 'newguy',
    password: 'pass',
    role: ROLES.STUDENT,
    isNewUser: true,
  },
];

const Login = () => {
  const [isChecked, setIschecked] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

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

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const matchedUser = dummyUsers.find(
      (user) =>
        user.identifier === formData.identifier &&
        user.password === formData.password
    );
    console.log(matchedUser);
    console.log(formData);

    if (!matchedUser) {
      setError('Invalid credentials');
      return;
    }

    // Simulate login success
    const { password, ...userData } = matchedUser;
    localStorage.setItem(
      'user',
      JSON.stringify({ ...userData, isLoggedIn: true })
    );
    setUser({ ...userData, isLoggedIn: true });
    if (userData.isNewUser) {
      navigate('/', { replace: true }); // show landing page
    } else if (userData.role === ROLES.CLASS_REP) {
      navigate('/class-rep/dashboard', { replace: true });
    } else if (userData.role === ROLES.STUDENT) {
      navigate('/student/dashboard', { replace: true });
    } else {
      navigate('/unauthorized', { replace: true });
    }
  };

  return (
    <div className="login">
      <section className="left">
        <h1 className="cap">logo</h1>
        <h2>Keep Track, Stay Connected</h2>
        <p>
          Vigilo helps you easily track and manage attendance in real-time,
          ensuring every presence is recorded accurately — making attendance
          simple, reliable, and stress-free.
        </p>
        <form
          className="login-form"
          onSubmit={handleLogin}>
          <section>
            {[
              {
                name: 'identifier',
                icon: FaIdCard,
                type: 'text',
                element: 'email / username / phone number',
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

          <div className="term-cond">
            <label>
              {isChecked ? <MdCheckCircle /> : <MdCheckCircleOutline />}
              <input
                required
                type="checkbox"
                onChange={() => setIschecked((prev) => !prev)}
                className="visually-hidden"
              />
            </label>
            <p>
              By continuing, you confirm that you've read and agree to Vigilo's{' '}
              <span>Terms of Use</span> and <span>Privacy Policy</span>
            </p>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {button.normal({
            element: 'Sign In',
            func: null, // handled by form onSubmit
            type: 'submit',
            name: 'login-btn',
          })}

          {button.normal({
            element: 'Create new account',
            func: () => navigate('/auth/register'),
          })}
        </form>
      </section>

      {/* Optional preview image */}
      {/* <section className="right">
        <div className="preview">
          <img src={img} alt="preview" />
        </div>
      </section> */}
    </div>
  );
};

export default Login;
