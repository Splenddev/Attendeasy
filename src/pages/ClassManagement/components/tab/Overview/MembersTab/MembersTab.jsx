import React, { useState } from 'react';
import { FaCrown, FaUserShield, FaUser } from 'react-icons/fa';
import { FiDownload, FiSearch } from 'react-icons/fi';
import './MembersTab.css';

const roleIcons = {
  classRep: (
    <FaCrown
      color="#25aff3"
      title="Class Rep"
    />
  ),
  assistant: (
    <FaUserShield
      color="#25aff3"
      title="Assistant"
    />
  ),
  member: (
    <FaUser
      color="#999"
      title="Member"
    />
  ),
};

const MembersTab = ({ members, classRepId = 1, assistantId = 2 }) => {
  const [search, setSearch] = useState('');

  const handleExport = () => {
    const csv = members
      .map(
        (m) => `"${m.name}","${m.id}","${getRole(m.id)}","${m.absenceRate}%"`
      )
      .join('\n');
    const blob = new Blob([`Name,ID,Role,Absence Rate\n${csv}`], {
      type: 'text/csv',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'group-members.csv';
    link.click();
  };

  const getRole = (id) => {
    if (id === classRepId) return 'classRep';
    if (id === assistantId) return 'assistant';
    return 'member';
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="members-tab">
      <div className="members-header">
        <h3>Group Members</h3>
        <div className="members-controls">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="export-btn"
            onClick={handleExport}>
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <div className="members-grid">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="member-card">
            <img
              src={member.avatar}
              alt={member.name}
              className="member-avatar"
            />
            <div className="member-info">
              <div className="name-role">
                <span className="member-name">{member.name}</span>
                {roleIcons[getRole(member.id)]}
              </div>
              <span className="member-id">{member.id}</span>
              <div
                className={`absence-rate ${
                  member.absenceRate >= 10
                    ? 'high'
                    : member.absenceRate > 0
                    ? 'mid'
                    : 'none'
                }`}>
                {member.absenceRate}% Absent
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersTab;
