import React, { useState, useMemo } from 'react';
import './GroupFind.css';
import { MdGroups } from 'react-icons/md';

const dummyGroups = [
  {
    _id: 'grp1',
    groupName: 'Class of Biochemistry – 400 Level',
    department: 'Biochemistry',
    faculty: 'Science',
    level: '400',
    bannerUrl: '',
    classRepName: 'Ada Okeke',
    privacy: 'Public',
  },
  {
    _id: 'grp2',
    groupName: 'Mechanical Engineering Final Year',
    department: 'Mechanical Engineering',
    faculty: 'Engineering',
    level: '500',
    bannerUrl: '',
    classRepName: 'John Obi',
    privacy: 'Private',
  },
  {
    _id: 'grp3',
    groupName: 'Computer Science – 300 Level',
    department: 'Computer Science',
    faculty: 'Science',
    level: '300',
    bannerUrl: '',
    classRepName: 'Grace Tunde',
    privacy: 'Public',
  },
  {
    _id: 'grp4',
    groupName: 'Accounting Year 2',
    department: 'Accounting',
    faculty: 'Management Sciences',
    level: '200',
    bannerUrl: '',
    classRepName: 'Yusuf Kareem',
    privacy: 'Private',
  },
];

const initialJoinStatus = {
  grp1: 'approved',
  grp2: 'pending',
  grp3: 'none',
  grp4: 'none',
};

const GroupFind = ({ user = {}, onJoin }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    faculty: user.faculty || '',
    department: user.department || '',
    level: user.level || '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [joinStatus, setJoinStatus] = useState(initialJoinStatus);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const pageSize = 4;

  const filteredGroups = useMemo(() => {
    const result = dummyGroups.filter((group) => {
      const matchQuery =
        group.groupName.toLowerCase().includes(query.toLowerCase()) ||
        group.classRepName?.toLowerCase().includes(query.toLowerCase());

      const matchFaculty =
        !filters.faculty || group.faculty === filters.faculty;
      const matchDepartment =
        !filters.department || group.department === filters.department;
      const matchLevel = !filters.level || group.level === filters.level;

      return matchQuery && matchFaculty && matchDepartment && matchLevel;
    });

    return result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.groupName.localeCompare(b.groupName);
      } else {
        return b.groupName.localeCompare(a.groupName);
      }
    });
  }, [query, filters, sortOrder]);

  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredGroups.slice(start, start + pageSize);
  }, [filteredGroups, currentPage]);

  const totalPages = Math.ceil(filteredGroups.length / pageSize);

  const handleJoinRequest = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const confirmJoin = () => {
    if (selectedGroup) {
      setJoinStatus((prev) => ({ ...prev, [selectedGroup._id]: 'pending' }));
      if (onJoin) onJoin(selectedGroup._id);
    }
    setShowModal(false);
  };

  const renderSearchSummary = () => {
    const terms = [];
    if (query) terms.push(`“${query}”`);
    if (filters.faculty) terms.push(`Faculty: ${filters.faculty}`);
    if (filters.department) terms.push(`Department: ${filters.department}`);
    if (filters.level) terms.push(`Level: ${filters.level}`);
    if (terms.length === 0) return null;
    return (
      <p className="summary">
        Found {filteredGroups.length} result(s) for {terms.join(', ')}
      </p>
    );
  };

  const cancelRequest = (groupId) => {
    setJoinStatus((prev) => ({ ...prev, [groupId]: 'none' }));
  };

  const leaveGroup = (groupId) => {
    setJoinStatus((prev) => ({ ...prev, [groupId]: 'none' }));
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="status pending">Pending</span>;
      case 'approved':
        return <span className="status approved">Approved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="find-group-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by group or class rep..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="dropdowns">
          <select
            value={filters.faculty}
            onChange={(e) => {
              setFilters((f) => ({ ...f, faculty: e.target.value }));
              setCurrentPage(1);
            }}>
            <option value="">All Faculties</option>
            <option value="Science">Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Management Sciences">Management Sciences</option>
          </select>
          <select
            value={filters.department}
            onChange={(e) => {
              setFilters((f) => ({ ...f, department: e.target.value }));
              setCurrentPage(1);
            }}>
            <option value="">All Departments</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Accounting">Accounting</option>
          </select>
          <select
            value={filters.level}
            onChange={(e) => {
              setFilters((f) => ({ ...f, level: e.target.value }));
              setCurrentPage(1);
            }}>
            <option value="">All Levels</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>
      </div>

      {renderSearchSummary()}

      <div className="group-results">
        {paginatedGroups.length === 0 ? (
          <p>No groups found.</p>
        ) : (
          paginatedGroups.map((group) => {
            const status = joinStatus[group._id] || 'none';
            return (
              <div
                key={group._id}
                className="find-group-card">
                <div class="found-group-banner center">
                  {group.bannerUrl ? (
                    <img
                      src={group.bannerUrl}
                      alt="Group Banner"
                      className="group-banner-img"
                    />
                  ) : (
                    <MdGroups
                      size={140}
                      color="grey"
                    />
                  )}
                </div>
                <div className="info">
                  <div className="found-group-header">
                    <h3>{group.groupName}</h3>
                    <span
                      className={`found-grp-tag ${group.privacy.toLocaleLowerCase()}`}>
                      {group.privacy}
                    </span>
                  </div>
                  <p>
                    {group.department} — {group.level} Level
                  </p>
                  <p>
                    <strong>Class Rep:</strong> {group.classRepName}
                  </p>
                  <div className="actions">
                    {renderStatusBadge(status)}
                    {status === 'none' &&
                      (group.privacy === 'Public' ? (
                        <button onClick={() => handleJoinRequest(group)}>
                          Request to Join
                        </button>
                      ) : (
                        <button
                          className="disabled-btn"
                          disabled>
                          Private Group
                        </button>
                      ))}
                    {status === 'pending' && group.privacy === 'Public' && (
                      <button
                        className="cancel-btn"
                        onClick={() => cancelRequest(group._id)}>
                        Cancel
                      </button>
                    )}
                    {status === 'approved' && (
                      <button
                        className="leave-btn"
                        onClick={() => leaveGroup(group._id)}>
                        Leave Group
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}

      {showModal && selectedGroup && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Join Request</h3>
            <p>
              Are you sure you want to request to join{' '}
              <strong>{selectedGroup.groupName}</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="confirm"
                onClick={confirmJoin}>
                Yes, Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupFind;
