import React from 'react';
import styles from './RoleSettings.module.css';
import { LuUserCheck, LuUserX } from 'react-icons/lu';
import ToggleSwitch from '../../Shared/ToggleSwith';

const RoleSettings = ({ settings, updateSetting }) => {
  return (
    <div className={styles.section}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Assign Co-Class Rep</label>
        <input
          type="text"
          value={settings.coClassRep}
          onChange={(e) => updateSetting('coClassRep', e.target.value)}
          placeholder="Enter student email or username"
          className={styles.input}
        />
      </div>

      <div className={styles.settingItem}>
        <div className={styles.settingText}>
          <h3 className={styles.settingTitle}>
            <LuUserCheck className={styles.icon} />
            <span>Restrict Plea Submission to Verified Members Only</span>
          </h3>
          <p className={styles.settingDescription}>
            Only verified students can submit absence pleas
          </p>
        </div>
        <ToggleSwitch
          checked={settings.verifiedMembersOnly}
          onChange={(value) => updateSetting('verifiedMembersOnly', value)}
          disabled={!settings.allowPleas}
        />
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Student Management</h3>
        <div className={styles.cardActions}>
          <button className={styles.warningButton}>
            <LuUserX className={styles.smallIcon} />
            <span>Revoke Student Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSettings;
