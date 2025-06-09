import React from 'react';
import './QuickActions.css';

const actions = [
  {
    label: 'Create Attendance',
    icon: '📝',
    key: 'createAttendance',
    tooltip: 'Open attendance creation form for a class.',
  },
  {
    label: 'Post Announcement',
    icon: '📢',
    key: 'postAnnouncement',
    tooltip: 'Notify students with important information.',
  },
  {
    label: 'Approve Media',
    icon: '🎞️',
    key: 'approveMedia',
    tooltip: 'View and approve student-uploaded class media.',
  },
  {
    label: 'Review Absence Pleas',
    icon: '📩',
    key: 'reviewPleas',
    tooltip: 'Check and respond to student absence requests.',
  },
];

const QuickActions = ({ onAction }) => {
  return (
    <div className="quick-actions">
      {actions.map(({ label, icon, key, tooltip }) => (
        <button
          key={key}
          className="quick-action-btn"
          title={tooltip}
          onClick={() => onAction(key)}>
          <span className="qa-icon">{icon}</span>
          <span className="qa-label">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
