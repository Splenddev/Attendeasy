import React, { useEffect, useState } from 'react';
import './GroupManagementPage.css';
import {
  FaLock,
  FaUserGraduate,
  FaBullhorn,
  FaCalendarAlt,
} from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import MembersTab from './components/tab/Overview/MembersTab/MembersTab';
import { useAuth } from '../../context/AuthContext';
import GroupSidebar from './components/GroupSidebar/GroupSidebar';
import GroupContents from './components/GroupContents/GroupContents';
import GroupRegFind from './features/GroupRegFind/GroupRegFind';
import { fetchGroupService } from '../../services/group.service';
import { toast } from 'react-toastify';
import Spinner from '../../components/Loader/Spinner/Spinner';
import { useErrorModal } from '../../hooks/useErrorModal';

const GroupManagementPage = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setNavTitle, updateUser } = useAuth();

  useEffect(() => setNavTitle('Group Management'), [setNavTitle]);

  const { open } = useErrorModal();

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

  useEffect(() => {
    fetchGroup();
  }, []);

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

  if (!user.group) return <GroupRegFind user={user} />;

  if (!group)
    return (
      <div className="group-not-found">
        <img
          src="https://undraw.co/api/illustrations/b45c5ed4-0f79-421a-8c2f-cb6ed06e5d72"
          alt="Group Not Found"
          className="group-not-found-image"
        />

        <h2>Oops! Group not found</h2>
        <p>
          We couldn’t load the group data. It may not exist or something went
          wrong while fetching it.
        </p>
        <button
          onClick={fetchGroup}
          className="refresh-btn">
          <FiRefreshCw style={{ marginRight: '8px' }} />
          Retry
        </button>
      </div>
    );

  return (
    <div className="group-page">
      <GroupSidebar
        group={group}
        refresh={fetchGroup}
        user={user}
        updateUser={updateUser}
      />
      <GroupContents
        user={user}
        group={group}
        refreshGroup={fetchGroup}
      />
    </div>
  );
};

export default GroupManagementPage;
