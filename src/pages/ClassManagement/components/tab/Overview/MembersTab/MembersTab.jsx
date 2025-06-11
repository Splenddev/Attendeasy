import React, { useState } from 'react';
import {
  FaSearch,
  FaCrown,
  FaUserPlus,
  FaUsers,
  FaUserGraduate,
} from 'react-icons/fa';
import './MembersTab.css';

const MembersTab = ({ user, group }) => {
  const isClassRep = user?.role === 'class-rep';
  const [search, setSearch] = useState('');
  const [view, setView] = useState('members'); // 'members' | 'requests'

  const filteredMembers = group.members?.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAccept = (id) => {
    alert(`Accepted ${id}`);
    // Add real logic here
  };

  const handleReject = (id) => {
    alert(`Rejected ${id}`);
    // Add real logic here
  };

  if (!isClassRep) {
    return (
      <div className="members-tab restricted-msg">
        👀 This information is only available to the class representative.
      </div>
    );
  }

  return (
    <div className="members-tab">
      <div className="members-header">
        <div className="navs">
          <button
            className={view === 'members' ? 'active' : ''}
            onClick={() => setView('members')}>
            <FaUsers /> Members
          </button>
          <button
            className={view === 'requests' ? 'active' : ''}
            onClick={() => setView('requests')}>
            <FaUserPlus /> Join Requests ({group.pendingRequests.length})
          </button>
        </div>

        {view === 'members' && (
          <div className="search-bar">
            <FaSearch size={16} />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {view === 'members' ? (
        <div className="member-grid">
          {filteredMembers?.map((student, idx) => (
            <div
              key={idx}
              className="member-card">
              <div className="member-top">
                <img
                  className="avatar"
                  src={student.avatar}
                  alt={student.name}
                />
                <div className="name-role">
                  <span>{student.name}</span>
                  {student.id === group.classRepId ? (
                    <span className="badge badge-cr">CR</span>
                  ) : student.id === group.studentAssistant ? (
                    <FaCrown
                      size={14}
                      color="#e8b200"
                      title="Student Assistant"
                    />
                  ) : (
                    <FaUserGraduate size={14} />
                  )}
                </div>
              </div>

              <div className="details">
                <span>
                  <strong>Email:</strong> {student.email}
                </span>
                <span>
                  <strong>Joined:</strong>{' '}
                  {new Date(student.joinedAt).toLocaleDateString()}
                </span>
                <span>
                  <strong>Absence Rate:</strong> {student.absenceRate ?? 0}%
                </span>
              </div>

              <button
                className="assign-btn"
                disabled={student.id === group.studentAssistant}
                onClick={() => group.setAssistant(student.id)}>
                {student.id === group.studentAssistant
                  ? 'Assistant'
                  : 'Make Assistant'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="member-grid">
          {group.pendingRequests?.map((req, idx) => (
            <div
              key={idx}
              className="member-card request-card">
              <div className="name-role">
                <span>{req.name}</span>
              </div>
              <div className="details">
                <span>
                  <strong>Requested:</strong>{' '}
                  {new Date(req.submittedAt).toLocaleString()}
                </span>
              </div>
              <div className="request-actions">
                <button
                  className="assign-btn accept"
                  onClick={() => handleAccept(req.id)}>
                  Accept
                </button>
                <button
                  className="assign-btn reject"
                  onClick={() => handleReject(req.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersTab;
