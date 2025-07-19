import { LuMapPin } from 'react-icons/lu';
import ToggleSwitch from '../../Shared/ToggleSwith';
import styles from './AttendanceSettings.module.css';

const AttendanceSettings = ({ settings, updateSetting }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Default Attendance Duration (hours)
          </label>
          <input
            type="number"
            value={settings.defaultDuration}
            onChange={(e) => updateSetting('defaultDuration', e.target.value)}
            className={styles.input}
            min={1}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Plea Window (days)</label>
          <input
            type="number"
            value={settings.pleaWindow}
            onChange={(e) => updateSetting('pleaWindow', e.target.value)}
            disabled={!settings.allowPleas}
            className={`${styles.input} ${
              !settings.allowPleas ? styles.disabled : ''
            }`}
            min={0}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Auto-Close Attendance at</label>
        <input
          type="time"
          value={settings.autoCloseTime}
          onChange={(e) => updateSetting('autoCloseTime', e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.switchRow}>
        <div>
          <h3 className={styles.switchTitle}>
            <LuMapPin className={styles.icon} />
            Require Geolocation for Marking
          </h3>
          <p className={styles.switchSub}>
            Students must be within class location to mark attendance
          </p>
        </div>
        <ToggleSwitch
          checked={settings.requireGeolocation}
          onChange={(value) => updateSetting('requireGeolocation', value)}
        />
      </div>

      <div className={styles.switchRow}>
        <div>
          <h3 className={styles.switchTitle}>Allow Pleas for Missed Classes</h3>
          <p className={styles.switchSub}>
            Enable students to submit absence pleas within defined window
          </p>
        </div>
        <ToggleSwitch
          checked={settings.allowPleas}
          onChange={(value) => updateSetting('allowPleas', value)}
        />
      </div>
    </div>
  );
};

export default AttendanceSettings;
