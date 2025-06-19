import React, { useEffect, useState } from 'react';
import './GroupManagementPage.css';
import {
  FaLock,
  FaUserGraduate,
  FaBullhorn,
  FaCalendarAlt,
} from 'react-icons/fa';
import MembersTab from './components/tab/Overview/MembersTab/MembersTab';
import { useAuth } from '../../context/AuthContext';
import GroupSidebar from './components/GroupSidebar/GroupSidebar';
import GroupContents from './components/GroupContents/GroupContents';
import GroupRegFind from './features/GroupRegFind/GroupRegFind';
import { fetchGroupService } from '../../services/group.services';
import { toast } from 'react-toastify';
import Spinner from '../../components/Loader/Spinner/Spinner';

const GroupManagementPage = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setNavTitle } = useAuth();
  useEffect(() => setNavTitle('Group Management'), [setNavTitle]);

  useEffect(() => {
    const fetchGroup = async () => {
      console.log(user.group);
      if (!user?.group) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetchGroupService(user.group);
        setGroup(res.data);
        toast.success(res.message);
      } catch (err) {
        console.error('Failed to fetch group:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [user?.group]);

  if (loading)
    return (
      <div className="full-page-loader-wrap">
        <Spinner scale="3" />
      </div>
    );
  if (!user.group) return <GroupRegFind user={user} />;
  if (!group) return <div>Group not found or fetch failed.</div>;

  return (
    <div className="group-page">
      <GroupSidebar />
      <GroupContents
        user={user}
        group={group}
      />
    </div>
  );
};

export default GroupManagementPage;
