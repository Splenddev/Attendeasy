import {
  FaBell,
  FaFlag,
  FaClock,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCamera,
  FaInfoCircle,
  FaBullhorn,
} from 'react-icons/fa';

import styles from './IconRenderer.module.css';

export function renderMediaTypeIcon(type, relatedType = null) {
  const baseProps = {
    size: 16,
    className: styles.iconShadow,
  };

  const iconMap = {
    announcement: {
      icon: FaBullhorn,
      color: '#f59e0b',
      title: 'New Announcement',
      bg: styles.announcementBg,
    },
    approval: {
      icon: FaCheckCircle,
      color: '#10b981',
      title: 'Approval Notice',
      bg: styles.approvalBg,
    },
    flag_alert: {
      icon: FaFlag,
      color: '#ef4444',
      title: 'Flagged Alert',
      bg: styles.flagBg,
    },
    media: {
      icon: FaCamera,
      color: '#3b82f6',
      title: 'New Media Upload',
      bg: styles.mediaBg,
    },
    info: {
      icon: FaInfoCircle,
      color: '#0ea5e9',
      title: 'Information',
      bg: styles.infoBg,
    },
    assignment_deadline: {
      icon: FaExclamationTriangle,
      color: '#f97316',
      title: 'Assignment Deadline',
      bg: styles.deadlineBg,
    },
    class_reminder: {
      icon: FaClock,
      color: '#8b5cf6',
      title: 'Class Reminder',
      bg: styles.reminderBg,
    },
    schedule: {
      icon: FaCalendarAlt,
      color: '#6366f1',
      title: 'Schedule Update',
      bg: styles.scheduleBg,
    },
    attendance: {
      icon: FaBell,
      color: '#16a34a',
      title: 'Attendance Notification',
      bg: styles.attendanceBg,
    },
  };

  const fallback = {
    icon: FaInfoCircle,
    color: '#6b7280',
    title: 'General Notification',
    bg: styles.defaultBg,
  };

  const selected = iconMap[type] || fallback;

  const Icon = selected.icon;

  return {
    icon: (
      <div
        className={`${styles.iconWrapper} ${selected.bg}`}
        title={selected.title}>
        <Icon
          {...baseProps}
          color={selected.color}
        />
      </div>
    ),
    meta: {
      type,
      relatedType,
      title: selected.title,
    },
  };
}
