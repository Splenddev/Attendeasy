import React from 'react';
import './OverviewTab.css';
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarCheck,
  FaClipboardList,
  FaChartLine,
  FaExclamationTriangle,
  FaBullhorn,
  FaClock,
} from 'react-icons/fa';
import AttendanceTrendChart from './AttendanceTrendChart ';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FiCornerUpRight, FiMail } from 'react-icons/fi';
import { MdChat, MdEmojiEvents, MdFollowTheSigns } from 'react-icons/md';

const OverviewTab = ({ group }) => {
  const {
    description,
    joinedStudents = [],
    leftStudents = [],
    completedClasses = 0,
    submittedAttendance = 0,
    lastAttendanceDate, // assume ISO string
    attendanceTrends = [], // e.g., [38, 35, 40, 36]
    topAbsentees = [], // e.g., [{ name: 'Jane', count: 5 }]
    engagementStats = {}, // e.g., { announcements: 5, acknowledgements: 120 }
  } = group;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMostAttendingStudents = (group) => {
    const attendanceCount = {};

    group.attendanceRecords.forEach(({ presentStudentIds }) => {
      presentStudentIds.forEach((id) => {
        attendanceCount[id] = (attendanceCount[id] || 0) + 1;
      });
    });

    // Map back to student names
    const ranked = group.members
      .map((member) => ({
        ...member,
        attendanceCount: attendanceCount[member.id] || 0,
      }))
      .filter((m) => m.role === 'Student')
      .sort((a, b) => b.attendanceCount - a.attendanceCount);

    return ranked.slice(0, 3); // Top 3
  };

  const mostAttending = getMostAttendingStudents(group);

  return (
    <div className="overview-tab">
      {/* Description */}
      <section className="overview-card">
        <h2>Group Description</h2>
        <p className="description">
          {description || 'No description provided.'}
        </p>
      </section>

      {/* Stats */}
      <section className="overview-card">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>
              <FaUserCheck className="icon" />
              Joined Students
            </h3>
            <p>{joinedStudents.length}</p>
          </div>
          <div className="card">
            <h3>
              <FaUserTimes className="icon" />
              Left Students
            </h3>
            <p>{leftStudents.length}</p>
          </div>
          <div className="card">
            <h3>
              <FaCalendarCheck className="icon" />
              Completed Classes
            </h3>
            <p>{completedClasses}</p>
          </div>
          <div className="card">
            <h3>
              <FaClipboardList className="icon" />
              Submitted Attendance
            </h3>
            <p>{submittedAttendance}</p>
          </div>
        </div>
      </section>
      <section className="overview-card">
        <h2 className="section-title">
          <FaClock className="inline-icon" /> Last Attendance Record
        </h2>
        <p>
          {lastAttendanceDate
            ? `Last marked on ${formatDate(lastAttendanceDate)}`
            : 'No attendance has been marked yet.'}
        </p>
      </section>
      <div className="overview-attendance-section">
        {/* Attendance Trends */}
        {group.attendanceTrends?.length > 0 && (
          <section className="overview-card chart-container">
            <h4>Attendance Trend (Recent Classes)</h4>
            <AttendanceTrendChart data={group.attendanceTrends} />
          </section>
        )}

        <div className="sections">
          <section className="absent overview-card">
            <h2>
              <FaExclamationTriangle /> Top Absentees
            </h2>
            {topAbsentees.length > 0 ? (
              <section className="absentees">
                <div className="absentees-headers">
                  <span>Name</span>
                  <span>Abs</span>
                  <span>Actions</span>
                </div>
                <hr />
                <ul className="absentee-list">
                  {topAbsentees.map((student, i) => (
                    <li key={i}>
                      <span className="absentee-details">
                        <img
                          src={`https://i.pravatar.cc/150?img=${i + 6}`}
                          alt={student.name}
                        />
                        {student.name}
                      </span>
                      <b>{student.count}</b>
                      <span className="actions">
                        <MdChat />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p>No frequent absentees.</p>
            )}
          </section>
          <section className="overview-card attendees">
            <h2>
              <MdEmojiEvents />
              Top Attendees
            </h2>
            <div className="attenders">
              <div className="attendees-headers">
                <span>Name</span>
                <span>Classes</span>
              </div>
              <hr />
              <ul className="attendees-list">
                {mostAttending.map((student, i) => (
                  <li key={student.id}>
                    <span className="attendees-details">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 6}`}
                        alt={student.name}
                      />
                      {student.name}
                    </span>
                    <b>{student.attendanceCount} </b>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Engagement Summary */}
      <section className="overview-card">
        <h2 className="section-title">
          <FaBullhorn className="inline-icon" /> Engagement Summary
        </h2>
        <p>
          Announcements sent:{' '}
          <strong>{engagementStats.announcements || 0}</strong>
        </p>
        <p>
          Acknowledgements:{' '}
          <strong>{engagementStats.acknowledgements || 0}</strong>
        </p>
      </section>

      {/* Time Since Last Attendance */}
    </div>
  );
};

export default OverviewTab;
