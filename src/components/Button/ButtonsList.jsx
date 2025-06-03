import './Button.css';

export const IconButton = ({
  disabled = false,
  icon,
  func,
  label,
  name,
  type = 'button',
}) => {
  const Icon = icon;
  return (
    <button
      disabled={disabled}
      className={`${name}`}
      onClick={func}
      aria-label={label || 'icon button'}
      tabIndex={0}
      type={type || 'button'}>
      <Icon />
    </button>
  );
};
export const IconTextButton = ({
  disabled = false,
  icon,
  func,
  label,
  name,
  element,
  type,
}) => {
  const Icon = icon;
  return (
    <button
      disabled={disabled}
      className={`${name} mixed`}
      onClick={func}
      aria-label={label || name || element}
      tabIndex={0}
      type={`${type || 'button'}`}>
      <Icon />
      {element}
    </button>
  );
};

export const NormalButton = ({
  disabled = false,
  element,
  func,
  name,
  type = 'button',
}) => {
  return (
    <button
      disabled={disabled}
      type={type || 'button'}
      onClick={func}
      className={`${name}`}>
      {element}
    </button>
  );
};
export const SimpleFunctionButton = ({
  disabled = false,
  name,
  element,
  setState,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${name}`}
      onClick={() => setState(element)}>
      {element}
    </button>
  );
};
