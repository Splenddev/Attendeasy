import React from 'react';
import {
  FaUsers,
  FaUserClock,
  FaBullhorn,
  FaCalendarPlus,
  FaClipboardList,
  FaUserTie,
  FaUniversity,
  FaBookOpen,
} from 'react-icons/fa';
import './OverviewTab.css';
const OverviewTab = ({ user, group }) => {
  const isClassRep = user?.role === 'classrep';
  const isStudent = user?.role === 'student';

  return (
    <div className="overview-tab">
      {/* Group Info */}
      <section className="card">
        <h2 className="card-title">
          <FaUniversity size={18} /> Group Info
        </h2>
        <div className="info-grid">
          <div>
            <strong>Group Name:</strong> {group.name}
          </div>
          <div>
            <strong>Level:</strong> {group.level}
          </div>
          <div>
            <strong>Department:</strong> {group.department}
          </div>
          <div>
            <strong>Faculty:</strong> {group.faculty}
          </div>
          <div>
            <strong>Created By:</strong> {group.classRepName}
          </div>
          <div>
            <strong>Members:</strong> {group.members?.length ?? 0}
          </div>
        </div>
      </section>

      {/* Class Rep View */}
      {isClassRep && (
        <>
          <section className="card">
            <h3 className="card-title">
              <FaClipboardList size={16} /> Quick Actions
            </h3>
            <div className="button-row">
              <button
                onClick={() => (window.location.href = '/create-attendance')}>
                <FaCalendarPlus size={14} /> Create Attendance
              </button>
              <button
                onClick={() => (window.location.href = '/create-schedule')}>
                <FaBookOpen size={14} /> Create Schedule
              </button>
              <button
                onClick={() => (window.location.href = '/make-announcement')}>
                <FaBullhorn size={14} /> New Announcement
              </button>
            </div>
          </section>

          <section className="card">
            <h3 className="card-title">
              <FaUsers size={16} /> Group Summary
            </h3>
            <div className="info-grid">
              <div>
                <strong>Total Members:</strong> {group.members?.length ?? 0}
              </div>
              <div>
                <strong>Pending Join Requests:</strong>{' '}
                {group.pendingRequests?.length ?? 0}
              </div>
              <div>
                <strong>Recent Absence Rate:</strong>{' '}
                {group.absenceRate ?? 'N/A'}%
              </div>
              <div>
                <strong>Student Assistant:</strong>{' '}
                {group.studentAssistant ?? 'Not Assigned'}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Shared: Next Class */}
      {group.nextClass && (
        <section className="card">
          <h3 className="card-title">
            <FaUserClock size={16} /> Upcoming Class
          </h3>
          <div className="info-grid">
            <div>
              <strong>Day:</strong> {group.nextClass.day}
            </div>
            <div>
              <strong>Time:</strong> {group.nextClass.time}
            </div>
            <div>
              <strong>Location:</strong> {group.nextClass.location}
            </div>
            <div>
              <strong>Topic:</strong> {group.nextClass.topic}
            </div>
          </div>
        </section>
      )}

      {/* Shared: Announcement */}
      {group.latestAnnouncement && (
        <section className="card">
          <h3 className="card-title">
            <FaBullhorn size={16} /> Latest Announcement
          </h3>
          <p className="announcement-title">{group.latestAnnouncement.title}</p>
          <p className="announcement-body">{group.latestAnnouncement.body}</p>
        </section>
      )}

      {/* Student View */}
      {isStudent && (
        <section className="card">
          <h3 className="card-title">
            <FaUserTie size={16} /> My Group Status
          </h3>
          <div className="info-grid">
            <div>
              <strong>Status:</strong> {group.joinStatus}
            </div>
            <div>
              <strong>Group Rep:</strong> {group.classRepName}
            </div>
            <div>
              <strong>Join Date:</strong> {group.joinDate ?? 'Not joined'}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default OverviewTab;
