import React from 'react';
import './ClassOverview.css';

const ClassOverview = ({ overview }) => {
  const {
    groupName,
    department,
    faculty,
    level,
    pendingRequests,
    activeAssignments,
    upcomingDeadlines,
    unreadNotifications,
  } = overview;

  return (
    <div className="class-overview">
      <h3>📘 Class Overview</h3>
      <div className="overview-grid">
        <div className="overview-item">
          <strong>Group Name:</strong>
          <span>{groupName}</span>
        </div>
        <div className="overview-item">
          <strong>Department:</strong>
          <span>{department}</span>
        </div>
        <div className="overview-item">
          <strong>Faculty:</strong>
          <span>{faculty}</span>
        </div>
        <div className="overview-item">
          <strong>Level:</strong>
          <span>{level}</span>
        </div>
        <div className="overview-item highlight">
          <strong>Pending Join Requests:</strong>
          <span>{pendingRequests}</span>
        </div>
        <div className="overview-item highlight">
          <strong>Active Assignments:</strong>
          <span>{activeAssignments}</span>
        </div>
        <div className="overview-item highlight">
          <strong>Upcoming Deadlines:</strong>
          <span>{upcomingDeadlines}</span>
        </div>
        <div className="overview-item highlight">
          <strong>Unread Notifications:</strong>
          <span>{unreadNotifications}</span>
        </div>
      </div>
    </div>
  );
};

export default ClassOverview;
