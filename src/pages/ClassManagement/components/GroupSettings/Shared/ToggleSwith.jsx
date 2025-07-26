import styles from '../GroupSettings.module.css';

const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <button
    onClick={() => !disabled && onChange(!checked)}
    type="button"
    disabled={disabled}
    className={`${styles.toggle} ${
      checked ? styles.toggleOn : styles.toggleOff
    } ${disabled ? styles.toggleDisabled : ''}`}>
    <span className={checked ? styles.knobOn : styles.knobOff} />
  </button>
);

export default ToggleSwitch;
