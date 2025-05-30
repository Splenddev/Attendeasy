import { FaIdCard, FaKey } from 'react-icons/fa';
import './Login.css';
import { AuthFieldSet } from '../../../components';
import { useState } from 'react';
import { MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import button from '../../../components/Button/Button';
import img from '../../../assets/splendid.png';
const Login = () => {
  const [isChecked, setIschecked] = useState(false);
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
        <form className="login-form">
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
              },
            ].map(({ icon, name, element, type }) => (
              <AuthFieldSet
                icon={icon}
                element={element}
                type={type}
                name={name}
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
                // hidden
              />
            </label>
            <p>
              By continuing, you confirm that you've read and agree to Vigilo's{' '}
              <span>Terms of Use</span> and <span>Privacy Policy</span>
            </p>
          </div>
          {button.normal({
            element: 'Sign In',
            func: () => console.log('you are logged in'),
            type: 'submit',
            name: 'login-btn',
          })}
          {button.normal({
            element: 'Create new account',
            func: () => console.log('you are logged in'),
            //name: 'login-btn',
          })}
        </form>
      </section>
      <section className="right">
        <div className="preview">
          <img
            src={img}
            alt="preview"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
