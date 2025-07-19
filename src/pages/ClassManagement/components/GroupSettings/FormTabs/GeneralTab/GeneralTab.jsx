import React from 'react';
import styles from './GeneralTab.module.css';
import { FiCamera, FiUpload } from 'react-icons/fi';

const GeneralTab = ({ settings, updateSetting }) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.twoColGrid}>
        <div>
          <label className={styles.label}>Group Name</label>
          <input
            type="text"
            value={settings.groupName}
            onChange={(e) => updateSetting('groupName', e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Group Code</label>
          <input
            type="text"
            value={settings.inviteCode}
            onChange={(e) => updateSetting('inviteCode', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div>
        <label className={styles.label}>Group Description</label>
        <textarea
          value={settings.groupDescription}
          onChange={(e) => updateSetting('groupDescription', e.target.value)}
          rows={3}
          className={styles.textarea}
        />
      </div>

      <div className={styles.threeColGrid}>
        <div>
          <label className={styles.label}>Faculty</label>
          <select
            value={settings.faculty}
            onChange={(e) => updateSetting('faculty', e.target.value)}
            className={styles.input}>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Department</label>
          <input
            type="text"
            value={settings.department}
            onChange={(e) => updateSetting('department', e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.label}>Level/Year</label>
          <input
            type="text"
            value={settings.year}
            onChange={(e) => updateSetting('year', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div>
        <label className={styles.label}>Group Avatar</label>
        <div className={styles.avatarSection}>
          <div className={styles.avatarPlaceholder}>
            <FiCamera className={styles.avatarIcon} />
          </div>
          <button className={styles.uploadButton}>
            <FiUpload className={styles.uploadIcon} />
            <span>Upload Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
