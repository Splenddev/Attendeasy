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
  style = { margin: 0 },
  register = null,
}) => (
  <div
    className={styles.settingItem}
    id={id || ''}
    style={{ ...style }}>
    <div className={styles.text}>
      <h3 className={styles.title}>
        {icon}
        <span>{title}</span>
      </h3>
      {register ? (
        <div className="toggle-wrapper">
          <label className="toggle-label">
            <input
              type="checkbox"
              {...register(id, {
                validate: (val) =>
                  typeof val === 'boolean' ? true : `${title} is required`,
              })}
              disabled={disabled}
              className="toggle-input"
            />
            <span className="toggle-slider" />
          </label>
        </div>
      ) : (
        <ToggleSwitch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
    <p className={styles.description}>{description}</p>
  </div>
);
export default SettingItem;
