import styles from '../GroupSettings.module.css';
import ToggleSwitch from './ToggleSwith';

const SettingItem = ({
  icon,
  title,
  description,
  checked,
  onChange,
  disabled,
}) => (
  <div className={styles.settingItem}>
    <div className={styles.text}>
      <h3 className={styles.title}>
        {icon}
        <span>{title}</span>
      </h3>
      <p className={styles.description}>{description}</p>
    </div>
    <ToggleSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);
export default SettingItem;
