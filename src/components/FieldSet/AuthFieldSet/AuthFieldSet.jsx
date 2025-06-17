import { useState } from 'react';
import './AuthFieldSet.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const AuthFieldSet = ({ name, type, icon, element, value, onChange }) => {
  const [showPassword, setShowPassword] = useState();
  const Icon = icon;
  return (
    <fieldset className="auth-field">
      <legend className="legend">
        <label
          className="label cap"
          htmlFor={name}>
          <Icon />
          {element || name}
        </label>
      </legend>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          name={name}
          id={name}
          type={name === 'password' ? (showPassword ? 'text' : name) : 'text'}
          placeholder={`Enter your ${element || name}`}
          required
          value={value}
          onChange={onChange}
        />

        {name === 'password' && (
          <span
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            onClick={() => setShowPassword((prev) => !prev)}>
            {!showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </fieldset>
  );
};

export default AuthFieldSet;
