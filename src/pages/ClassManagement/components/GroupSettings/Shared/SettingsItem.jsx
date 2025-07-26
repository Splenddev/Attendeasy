import styles from '../GroupSettings.module.css';
import ToggleSwitch from './ToggleSwith';

const SettingItem = ({
  icon,
  title,
  description,
  checked,
  onChange,
  disabled,
  id,
}) => (
  <div
    className={styles.settingItem}
    id={id || ''}>
    <div className={styles.text}>
      <h3 className={styles.title}>
        {icon}
        <span>{title}</span>
      </h3>
      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
    <p className={styles.description}>{description}</p>
  </div>
);
export default SettingItem;
