import React, { useState, useMemo, useEffect } from 'react';
import './GroupFind.css';
import { MdClose, MdGroups, MdSend } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  cancelJoinRequestService,
  joinGroupService,
  searchGroupsService,
} from '../../../../services/group.service';
import Spinner from '../../../../components/Loader/Spinner/Spinner';
import button from '../../../../components/Button/Button';
import { formatName } from '../../../../utils/helpers';

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
      toast.error(err.message || 'Failed to fetch groups');
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
    setLoaders((prev) => ({ ...prev, join: true }));
    try {
      await joinGroupService(selectedGroup._id);
      setJoinStatus((prev) => ({
        ...prev,
        [selectedGroup._id]: 'pending',
      }));
      toast.success('Join request sent');
      if (onJoin) onJoin(selectedGroup._id);
      await fetchGroups();
    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Failed to send join request');
    } finally {
      setLoaders((prev) => ({ ...prev, join: false }));
      setShowModal(false);
    }
  };

  const cancelRequest = async (groupId) => {
    try {
      await cancelJoinRequestService(groupId);
      setJoinStatus((prev) => ({ ...prev, [groupId]: 'none' }));
      toast.info('Join request cancelled');
      await fetchGroups();
    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Failed to cancel request');
    }
  };

  const leaveGroup = async (groupId) => {
    await fetchGroups();
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
              <option value="Sciences">Sciences</option>
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
              <option value="Chemistry">Chemistry</option>
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
              <option value="100L">100L</option>
              <option value="200L">200L</option>
              <option value="300L">300L</option>
              <option value="400L">400L</option>
              <option value="500L">500L</option>
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
          <Spinner
            scale="5"
            size="35px"
            borderWidth="2px"
          />
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
                <section className="found-group-cover">
                  <div className="found-group-banner ">
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
                  <div className="found-group-header">
                    <h3>{group.groupName}</h3>
                    <p>
                      Faculty of {group.faculty} | {group.department} Dpt.
                    </p>
                  </div>
                </section>
                <div className="info">
                  <p>
                    <span className="heading">Level</span>
                    {formatName(group.level)}
                  </p>
                  <p>
                    <span className="heading">Type</span>
                    <span
                      className={`found-grp-tag ${group.visibility?.toLowerCase()}`}>
                      {group.visibility}
                    </span>
                  </p>
                  <p>
                    <span className="heading">Class Rep</span>
                    {formatName(group.creator.name)}
                  </p>
                </div>
                <div className="actions">
                  {renderStatusBadge(status)}
                  {status === 'none' &&
                    (group.visibility === 'public' ? (
                      <button onClick={() => handleJoinRequest(group)}>
                        Join
                      </button>
                    ) : (
                      <button
                        className="disabled-btn"
                        disabled>
                        Private Group
                      </button>
                    ))}
                  {status === 'pending' &&
                    group.visibility === 'public' &&
                    button.multiple({
                      name: 'cancel-btn',
                      element: 'Withdraw',
                      func: () => cancelRequest(group._id),
                      icon: MdClose,
                    })}
                  {status === 'approved' && (
                    <button
                      className="leave-btn"
                      onClick={() => leaveGroup(group._id)}>
                      Leave Group
                    </button>
                  )}
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
              {button.multiple({
                icon: loaders.join ? FiLoader : MdSend,
                func: () => {
                  confirmJoin();
                },
                name: 'confirm',
                element: loaders.join ? 'Sending...' : 'Yes, Send',
                loader: loaders.join,
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupFind;
