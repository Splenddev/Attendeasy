import RadioGroup from '../../Shared/RadioGroup';
import ToggleSwitch from '../../Shared/ToggleSwith';
import styles from './PrivacySettings.module.css';

const PrivacySettings = ({ settings, updateSetting }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.block}>
        <h3 className={styles.heading}>Members List Visibility</h3>
        <RadioGroup
          name="membersVisibility"
          value={settings.membersListVisibility}
          options={[
            { value: 'classRep', label: 'Only Class Rep (default)' },
            { value: 'allMembers', label: 'All Members' },
          ]}
          onChange={(value) => updateSetting('membersListVisibility', value)}
        />
      </div>

      <div className={styles.block}>
        <h3 className={styles.heading}>Group Search Visibility</h3>
        <RadioGroup
          name="searchVisibility"
          value={settings.groupSearchVisibility}
          options={[
            { value: 'public', label: 'Publicly searchable' },
            { value: 'invite', label: 'Only via invite' },
          ]}
          onChange={(value) => updateSetting('groupSearchVisibility', value)}
        />
      </div>

      <div className={styles.row}>
        <div>
          <h3 className={styles.heading}>Allow Join Requests</h3>
          <p className={styles.subText}>
            Enable students to request to join this group
          </p>
        </div>
        <ToggleSwitch
          checked={settings.allowJoinRequests}
          onChange={(value) => updateSetting('allowJoinRequests', value)}
        />
      </div>

      <div className={styles.row}>
        <div>
          <h3 className={styles.heading}>Show Class Schedule to Students</h3>
          <p className={styles.subText}>
            Allow students to view the class schedule
          </p>
        </div>
        <ToggleSwitch
          checked={settings.showScheduleToStudents}
          onChange={(value) => updateSetting('showScheduleToStudents', value)}
        />
      </div>
    </div>
  );
};

export default PrivacySettings;
