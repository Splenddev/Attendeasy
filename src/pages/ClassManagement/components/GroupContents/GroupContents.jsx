import { useState } from 'react';
import { Tabs } from '../Tabs';
import './GroupContents.css';
import OverviewTab from '../tab/Overview/OverviewTab';
import MembersTab from '../tab/Overview/MembersTab/MembersTab';
import AnnouncementsTab from '../AnnouncementsTab/AnnouncementsTab';

// Dummy component imports (replace with real ones)
// import Announcements from './tabs/Announcements';
// import Schedule from './tabs/Schedule';
// import Attendance from './tabs/Attendance';
// import Materials from './tabs/Materials';

const GroupContents = ({ user, group }) => {
  const isClassRep = user?.role === 'class-rep';
  const isStudent = user?.role === 'student';
  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'members', label: 'Members', show: isClassRep },
    { key: 'announcements', label: 'Announcements' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'materials', label: 'Materials' },
  ].filter((tab) => tab.show === undefined || tab.show);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <OverviewTab group={group} />;
      case 'members':
        return <MembersTab members={group.members} />;
      case 'announcements':
        return (
          <AnnouncementsTab
            user={user}
            announcements={group.announcements}
          />
        );
      // case 'schedule':
      //   return <Schedule user={user} />;
      // case 'attendance':
      //   return <Attendance user={user} />;
      // case 'materials':
      //   return <Materials user={user} />;
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
