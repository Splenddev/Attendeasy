import styles from './NotificationSettings.module.css';
import {
  LuMail,
  LuCalendar,
  LuFileText,
  LuCamera,
  LuEye,
  LuMessageSquare,
} from 'react-icons/lu';
import SettingItem from '../../Shared/SettingsItem';

const NotificationSettings = ({ settings, updateSetting }) => {
  return (
    <>
      <div className={styles.section}>
        <SettingItem
          icon={<LuMessageSquare className={styles.icon} />}
          title="Allow Students to Receive Private Messages"
          description="Enable direct messaging between class members"
          checked={settings.allowPrivateMessages}
          onChange={(val) => updateSetting('allowPrivateMessages', val)}
        />

        <SettingItem
          icon={<LuMail className={styles.icon} />}
          title="Enable Email/Push Notifications"
          description="Send notifications about assignments, attendance, and announcements"
          checked={settings.emailNotifications}
          onChange={(val) => updateSetting('emailNotifications', val)}
        />

        <SettingItem
          icon={<LuCalendar className={styles.icon} />}
          title="Weekly Digest for Students"
          description="Send weekly summary of attendance and assignments"
          checked={settings.weeklyDigest}
          onChange={(val) => updateSetting('weeklyDigest', val)}
        />
      </div>

      <div className={styles.section}>
        <SettingItem
          icon={<LuFileText className={styles.icon} />}
          title="Allow Student Assignment Uploads"
          description="Enable students to submit assignments directly"
          checked={settings.allowStudentUploads}
          onChange={(val) => updateSetting('allowStudentUploads', val)}
        />

        <SettingItem
          icon={<LuCamera className={styles.icon} />}
          title="Allow Student Media Uploads"
          description="Enable students to upload images and videos"
          checked={settings.allowMediaUploads}
          onChange={(val) => updateSetting('allowMediaUploads', val)}
        />

        <SettingItem
          icon={<LuEye className={styles.icon} />}
          title="Require Approval Before Media is Visible"
          description="Review media uploads before they appear to other students"
          checked={settings.requireApproval}
          onChange={(val) => updateSetting('requireApproval', val)}
          disabled={!settings.allowMediaUploads}
        />
      </div>
    </>
  );
};

export default NotificationSettings;
