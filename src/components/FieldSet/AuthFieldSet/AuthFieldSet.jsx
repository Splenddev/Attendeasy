import './AuthFieldSet.css';
const AuthFieldSet = ({ name, type, icon, element, value, onChange }) => {
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
      <input
        name={name}
        id={name}
        type={type || name}
        placeholder={`Enter your ${element || name}`}
        required
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default AuthFieldSet;
