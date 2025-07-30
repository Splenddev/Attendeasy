import { useState } from 'react';
import './GroupContents.css';
import OverviewTab from '../tab/Overview/OverviewTab';
import MembersTab from '../tab/Overview/MembersTab/MembersTab';
import AnnouncementsTab from '../AnnouncementsTab/AnnouncementsTab';
import { Tabs } from '../../features/Tabs/Tabs';
import JoinRequestPage from '../tab/JoinRequestPage/JoinRequestPage';
import {
  approveJoinRequestService,
  rejectJoinRequestService,
} from '../../../../services/group.service';
import { toast } from 'react-toastify';
import GroupCloudTab from '../tab/GroupCloudTab/GroupCloudTab';
import AttendanceTab from '../tab/AttendanceTab/AttendanceTab';
import { useFetchGroupTabAttendances } from '../../../../hooks/useAttendance';
import Spinner from '../../../../components/Loader/Spinner/Spinner';
import GroupSettings from '../GroupSettings/GroupSettings';

// Dummy component imports (replace with real ones)
// import Announcements from './tabs/Announcements';
// import Schedule from './tabs/Schedule';
// import Attendance from './tabs/Attendance';
// import Materials from './tabs/Materials';

const GroupContents = ({
  user,
  group,
  refreshGroup,
  selectedTab = 'overview',
  setSelectedTab = null,
}) => {
  const isClassRep = user?.role === 'class-rep';
  const isStudent = user?.role === 'student';

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'members', label: 'Members', show: isClassRep },
    { key: 'join-requests', label: 'Join Requests', show: isClassRep },
    { key: 'announcements', label: 'Announcements' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'materials', label: 'Materials' },
    { key: 'settings', label: 'Settings' },
  ].filter((tab) => tab.show === undefined || tab.show);

  const handleJoinRequestAction = async (userId, action) => {
    const res =
      action === 'approve'
        ? await approveJoinRequestService(group._id, userId)
        : await rejectJoinRequestService(group._id, userId);
    if (res.success) {
      await refreshGroup();
    }
  };

  const { data, loading, error, refetch } = useFetchGroupTabAttendances(
    user.group
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <OverviewTab
            group={group}
            isClassRep={isClassRep}
          />
        );
      case 'members':
        return <MembersTab group={group} />;
      case 'join-requests':
        return (
          <JoinRequestPage
            group={group}
            onAction={handleJoinRequestAction}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsTab
            user={user}
            announcements={group.announcements}
          />
        );
      case 'settings':
        return <GroupSettings user={user} />;
      case 'attendance':
        return (
          <AttendanceTab
            data={data}
            error={error}
            loading={loading}
            retry={refetch}
            isClassRep={isClassRep}
          />
        );
      case 'materials':
        return <GroupCloudTab user={user} />;
      default:
        return <div>Tab not found.</div>;
    }
  };

  return (
    <div className="group-contents">
      <section className="tab-container">
        <Tabs
          tabs={tabs}
          selected={selectedTab}
          onChange={setSelectedTab}
        />
      </section>
      <section className="tab-content">{renderTabContent()}</section>
    </div>
  );
};

export default GroupContents;
