import React, { useEffect, useState } from 'react';
import './GroupManagementPage.css';
import { FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import GroupSidebar from './components/GroupSidebar/GroupSidebar';
import GroupContents from './components/GroupContents/GroupContents';
import GroupRegFind from './features/GroupRegFind/GroupRegFind';
import { fetchGroupService } from '../../services/group.service';
import { toast } from 'react-toastify';
import Spinner from '../../components/Loader/Spinner/Spinner';
import { useErrorModal } from '../../hooks/useErrorModal';
import useGroupSocketListener from '../../hooks/useGroupSocketListener ';

const GroupManagementPage = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  const { user, setNavTitle, updateUser } = useAuth();
  const { open } = useErrorModal();

  useEffect(() => setNavTitle('Group Management'), [setNavTitle]);

  const fetchGroup = async () => {
    if (!user?.group) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetchGroupService(user.group);
      setGroup(res.data);
    } catch (err) {
      console.error('Failed to fetch group:', err.message);
      toast.error('Failed to fetch group');
      open(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch group data on mount
  useEffect(() => {
    fetchGroup();
  }, []);

  // ✅ Listen for socket updates and refresh group
  useGroupSocketListener((payload) => {
    if (payload.groupId === user?.group) {
      console.log('🔄 Refreshing group data due to socket event:', payload);
      fetchGroup();
    }
  });

  if (loading)
    return (
      <div className="full-page-loader-wrap">
        <Spinner
          size="35px"
          scale="2.5"
          borderWidth="2px"
        />
      </div>
    );

  if (!user.group)
    return (
      <GroupRegFind
        user={user}
        setNavTitle={setNavTitle}
        fetchGroup={fetchGroup}
      />
    );

  if (!group)
    return (
      <div className="group-not-found center">
        <div className="group-not-found-card">
          <img
            src="/illustrations/group-not-found.jpg"
            alt="Group Not Found"
            className="group-not-found-image"
          />

          <h2 className="group-not-found-title">
            We couldn’t retrieve your group
          </h2>

          <p className="group-not-found-description">
            Something went wrong while trying to load this group’s information.
            Possible reasons include:
          </p>

          <ul className="group-not-found-list">
            <li>Temporary network issues or server downtime</li>
            <li>The group no longer exists or was removed</li>
            <li>Connectivity issues on your device</li>
          </ul>

          <p className="group-not-found-footer">
            Please check your internet connection and try again. If the issue
            persists, contact your class representative.
          </p>

          <button
            onClick={fetchGroup}
            className="refresh-btn">
            <FiRefreshCw style={{ marginRight: '8px' }} />
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="group-page">
      <GroupSidebar
        group={group}
        refresh={fetchGroup}
        user={user}
        updateUser={updateUser}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <GroupContents
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        user={user}
        group={group}
        refreshGroup={fetchGroup}
      />
    </div>
  );
};

export default GroupManagementPage;
