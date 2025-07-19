import React, { useState } from 'react';
import {
  FiSettings,
  FiShield,
  FiClock,
  FiBell,
  FiBookOpen,
  FiUsers,
  FiAlertTriangle,
  FiSave,
  FiUpload,
  FiMapPin,
  FiMail,
  FiEye,
  FiCamera,
  FiEyeOff,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiUserCheck,
  FiUserX,
  FiTrash2,
  FiRotateCcw,
  FiPause,
} from 'react-icons/fi';

import styles from './GroupSettings.module.css';
import GeneralTab from './FormTabs/GeneralTab/GeneralTab';
import PrivacySettings from './FormTabs/PrivacySettings/PrivacySettings';
import AttendanceSettings from './FormTabs/AttendanceSettings/AttendanceSettings';
import NotificationSettings from './FormTabs/NotificationSettings/NotificationSettings';
import RoleSettings from './FormTabs/RoleSettings/RoleSettings';

const GroupSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [settings, setSettings] = useState({
    groupName: 'Computer Science 2024',
    groupDescription: 'CS undergraduate program discussions and announcements',
    faculty: 'Engineering',
    department: 'Computer Science',
    level: 'Undergraduate',
    year: '2024',
    inviteCode: 'CS2024-INV',
    avatar: null,
    membersListVisibility: 'classRep',
    groupSearchVisibility: 'invite',
    allowJoinRequests: true,
    showScheduleToStudents: true,
    defaultDuration: '1',
    requireGeolocation: true,
    pleaWindow: '2',
    autoCloseTime: '23:59',
    allowPleas: true,
    allowPrivateMessages: true,
    emailNotifications: true,
    weeklyDigest: true,
    allowStudentUploads: true,
    allowMediaUploads: true,
    requireApproval: false,
    coClassRep: '',
    verifiedMembersOnly: false,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
    { id: 'attendance', label: 'Attendance', icon: FiClock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'assignments', label: 'Assignments', icon: FiBookOpen },
    { id: 'roles', label: 'Roles', icon: FiUsers },
    { id: 'danger', label: 'Danger Zone', icon: FiAlertTriangle },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralTab
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'attendance':
        return (
          <AttendanceSettings
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'assignments':
        return (
          <div className={styles.tabPlaceholder}>Assignments Tab Content</div>
        );
      case 'roles':
        return (
          <RoleSettings
            settings={settings}
            updateSetting={updateSetting}
          />
        );
      case 'danger':
        return (
          <div className={styles.tabPlaceholder}>Danger Zone Tab Content</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Group Settings</h1>
        <p>Manage your group configuration and preferences</p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabButton} ${
                  activeTab === tab.id ? styles.activeTab : ''
                } ${tab.id === 'danger' ? styles.dangerTab : ''}`}>
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        <main className={styles.main}>
          <div className={styles.contentBox}>{renderTabContent()}</div>
          <div className={styles.saveWrapper}>
            <button
              className={styles.saveBtn}
              onClick={handleSave}>
              <FiSave size={18} />
              <span>Save Settings</span>
            </button>
          </div>
        </main>
      </div>

      {showSaveConfirm && (
        <div className={styles.toast}>
          <div className={styles.toastDot}></div>
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default GroupSettings;
