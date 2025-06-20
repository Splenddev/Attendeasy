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
      title="Assistant Rep"
    />
  ),
  member: (
    <FaUser
      color="#999"
      title="Member"
    />
  ),
};

const MembersTab = ({ group = {} }) => {
  const [search, setSearch] = useState('');

  const { members, creator, assistantReps } = group;

  console.log(members);
  console.log(group.members);
  if (!members || !creator) {
    return <p>Loading group members...</p>;
  }
  // Identify role for each member based on IDs
  const getRole = (memberId) => {
    if (creator?._id === memberId) return 'classRep';
    if (assistantReps.some((a) => a._id === memberId)) return 'assistant';
    return 'member';
  };

  // Process members for display
  const displayMembers = members.map((m) => ({
    id: m._id,
    name: m.name,
    avatar: m.avatar,
    role: getRole(m._id),
    absenceRate: Math.floor(Math.random() * 20), // Placeholder, replace later
  }));

  const filteredMembers = displayMembers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const csv = displayMembers
      .map((m) => `"${m.name}","${m.id}","${m.role}","${m.absenceRate}%"`)
      .join('\n');
    const blob = new Blob([`Name,ID,Role,Absence Rate\n${csv}`], {
      type: 'text/csv',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'group-members.csv';
    link.click();
  };

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
              src={
                member.avatar
                  ? member.avatar
                  : `/main_${member.role}_avatar.png`
              }
              alt={member.name}
              className="member-avatar"
            />
            <div className="member-info">
              <div className="name-role">
                <span className="member-name">{member.name}</span>
                {roleIcons[member.role]}
              </div>
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
