import './Button.css';

export const IconButton = ({ icon, func, label, name, type = 'button' }) => {
  const Icon = icon;
  return (
    <button
      className={`${name}`}
      onClick={func}
      aria-label={label || 'icon button'}
      tabIndex={0}
      type={type}>
      <Icon />
    </button>
  );
};
export const IconTextButton = ({ icon, func, label, name, element, type }) => {
  const Icon = icon;
  return (
    <button
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

export const NormalButton = ({ element, func, name, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={func}
      className={`${name}`}>
      {element}
    </button>
  );
};
export const SimpleFunctionButton = ({ name, element, setState }) => {
  return (
    <button
      className={`${name}`}
      onClick={() => setState(element)}>
      {element}
    </button>
  );
};
