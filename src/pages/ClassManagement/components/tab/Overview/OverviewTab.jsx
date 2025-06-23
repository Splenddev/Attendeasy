import React from 'react';
import './OverviewTab.css';
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarCheck,
  FaClipboardList,
  FaClock,
  FaHandshake,
  FaUserClock,
} from 'react-icons/fa';
import { MdMarkEmailUnread } from 'react-icons/md';
import { HiCloudUpload, HiUserAdd, HiUserCircle } from 'react-icons/hi';
import { BiSolidUserBadge, BiUserCircle } from 'react-icons/bi';

const OverviewTab = ({ group }) => {
  const {
    description,
    members = [],
    attendances = [],
    assistantReps = [],
    isArchived,
    updatedAt,
    joinRequests,
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

  return (
    <div className="overview-tab">
      {/* Description */}
      <section className="overview-card">
        <h2>Group Description</h2>
        <p className="description">
          {description || 'No description provided.'}
        </p>
      </section>

      {/* Summary Stats */}
      <section className="overview-card">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="card">
            <h3>
              <FaUserCheck className="icon" />
              Total Members
            </h3>
            <p>{members.length}</p>
          </div>

          <div className="card">
            <h3>
              <FaUserClock className="icon" />
              Join Requests
            </h3>
            <p>{joinRequests.length}</p>
          </div>

          <div className="card">
            <h3>
              <HiCloudUpload className="icon" />
              Media Uploads
            </h3>
            <p>{joinRequests.length}</p>
          </div>

          <div className="card">
            <h3>
              <BiSolidUserBadge className="icon" />
              Assistant Reps
            </h3>
            <p>{assistantReps.length}</p>
          </div>

          <div className="card">
            <h3>
              <FaCalendarCheck className="icon" />
              Total Attendance Records
            </h3>
            <p>{attendances.length}</p>
          </div>

          <div className="card">
            <h3>
              <FaClipboardList className="icon" />
              Archived
            </h3>
            <p>{isArchived ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </section>

      {/* Last Attendance */}
      <section className="overview-card">
        <h2 className="section-title">
          <FaClock className="inline-icon" /> Last Attendance Record
        </h2>
        <p>
          {attendances.length > 0
            ? `Last recorded on ${formatDate(
                attendances[attendances.length - 1]?.createdAt || updatedAt
              )}`
            : 'No attendance has been marked yet.'}
        </p>
      </section>
    </div>
  );
};

export default OverviewTab;
