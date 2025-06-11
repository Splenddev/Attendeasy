import React from 'react';

const OverviewTab = ({ user, group }) => {
  const isClassRep = user?.role === 'class-rep';
  const isStudent = user?.role === 'student';

  return (
    <div className="overview-tab">
      {/* Group Info */}
      <div className="card">
        <h2 className="card-title">Group Overview</h2>
        <div className="grid two-col">
          <p>
            <strong>Name:</strong> {group.name}
          </p>
          <p>
            <strong>Level:</strong> {group.level}
          </p>
          <p>
            <strong>Department:</strong> {group.department}
          </p>
          <p>
            <strong>Faculty:</strong> {group.faculty}
          </p>
        </div>
      </div>

      {/* Class Rep Section */}
      {isClassRep && (
        <>
          <div className="card">
            <h3 className="card-title">Group Summary</h3>
            <div className="grid two-col">
              <p>
                <strong>Members:</strong> {group.members?.length ?? 0}
              </p>
              <p>
                <strong>Join Requests:</strong>{' '}
                {group.pendingRequests?.length ?? 0}
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="button-group">
              <button
                onClick={() => (window.location.href = '/create-attendance')}>
                ➕ Create Attendance
              </button>
              <button
                onClick={() => (window.location.href = '/create-schedule')}>
                📅 Create Schedule
              </button>
            </div>
          </div>

          {group.latestAnnouncement && (
            <div className="card">
              <h3 className="card-title">📢 Latest Announcement</h3>
              <p>
                <strong>{group.latestAnnouncement.title}</strong>
              </p>
              <p>{group.latestAnnouncement.body.slice(0, 120)}...</p>
            </div>
          )}
        </>
      )}

      {/* Student Section */}
      {isStudent && (
        <>
          <div className="card">
            <h3 className="card-title">My Group Status</h3>
            <div className="grid two-col">
              <p>
                <strong>Status:</strong> {group.joinStatus}
              </p>
              <p>
                <strong>Class Rep:</strong> {group.classRepName}
              </p>
            </div>
          </div>

          {group.nextClass && (
            <div className="card">
              <h3 className="card-title">📆 Next Class</h3>
              <p>
                <strong>Day:</strong> {group.nextClass.day}
              </p>
              <p>
                <strong>Time:</strong> {group.nextClass.time}
              </p>
              <p>
                <strong>Topic:</strong> {group.nextClass.topic}
              </p>
              <p>
                <strong>Location:</strong> {group.nextClass.location}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OverviewTab;
