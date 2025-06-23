import React, { useState, useMemo, useEffect } from 'react';
import './GroupFind.css';
import { MdGroups } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  cancelJoinRequestService,
  joinGroupService,
  searchGroupsService,
} from '../../../../services/group.services';
import Spinner from '../../../../components/Loader/Spinner/Spinner';

const GroupFind = ({ user = {}, onJoin }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    faculty: user.faculty || '',
    department: user.department || '',
    level: user.level || '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [groups, setGroups] = useState([]);
  const [joinStatus, setJoinStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaders, setLoaders] = useState({
    join: false,
    leave: false,
    search: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const pageSize = 4;

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await searchGroupsService({
        query,
        faculty: filters.faculty,
        department: filters.department,
        level: filters.level,
        sortOrder,
      });

      setGroups(res.groups || []);
      setJoinStatus(res.joinStatus || {}); // Optional if returned
    } catch (err) {
      toast.error('Failed to fetch groups');
      console.error('Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [query, filters, sortOrder]);

  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return groups.slice(start, start + pageSize);
  }, [groups, currentPage]);

  const totalPages = Math.ceil(groups.length / pageSize);

  const handleJoinRequest = (group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const confirmJoin = async () => {
    if (!selectedGroup) return;
    try {
      await joinGroupService(selectedGroup._id);
      setJoinStatus((prev) => ({
        ...prev,
        [selectedGroup._id]: 'pending',
      }));
      toast.success('Join request sent');
      if (onJoin) onJoin(selectedGroup._id);
    } catch (err) {
      console.log(err);
      toast.error('Failed to send join request');
    }
    setShowModal(false);
  };

  const cancelRequest = async (groupId) => {
    try {
      await cancelJoinRequestService(groupId);
      setJoinStatus((prev) => ({ ...prev, [groupId]: 'none' }));
      toast.info('Join request cancelled');
    } catch (err) {
      console.log(err);
      toast.error('Failed to cancel request');
    }
  };

  const leaveGroup = (groupId) => {
    setJoinStatus((prev) => ({ ...prev, [groupId]: 'none' }));
    // Optional: add leaveGroupService
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
        Found {groups.length} result(s) for {terms.join(', ')}
      </p>
    );
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
          <div className="dropdown">
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
          </div>
          <div className="dropdown">
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
          </div>
          <div className="dropdown">
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
          </div>
          <div className="dropdown">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {renderSearchSummary()}

      {loading ? (
        <div className="group-results-loader">
          <Spinner scale="5" />
          <p>Loading...</p>
        </div>
      ) : groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        <div className="group-results">
          {paginatedGroups.map((group) => {
            const isJoinRequested = group.joinRequests.find(
              (req) => req.user === user._id
            );
            let status = isJoinRequested ? isJoinRequested.status : 'none';
            return (
              <div
                key={group._id}
                className="find-group-card">
                <div className="found-group-banner center">
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
                      className={`found-grp-tag ${group.visibility?.toLowerCase()}`}>
                      {group.visibility}
                    </span>
                  </div>
                  <p>
                    {group.department} — {group.level} Level
                  </p>
                  <p>
                    <strong>Class Rep:</strong> {group.creator.name}
                  </p>
                  <div className="actions">
                    {renderStatusBadge(status)}
                    {status === 'none' &&
                      (group.visibility === 'public' ? (
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
                    {status === 'pending' && group.visibility === 'public' && (
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
          })}{' '}
        </div>
      )}

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
