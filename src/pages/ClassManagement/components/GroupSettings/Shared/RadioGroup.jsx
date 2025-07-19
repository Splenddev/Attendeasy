import styles from '../GroupSettings.module.css';
const RadioGroup = ({ name, value, options, onChange, disabled = false }) => (
  <div className={styles.radioGroup}>
    {options.map((option) => (
      <label
        key={option.value}
        className={`${styles.radioItem} ${disabled ? styles.disabled : ''} ${
          value === option.value ? styles.selected : ''
        }`}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);

export default RadioGroup;
