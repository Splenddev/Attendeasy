import { useState } from 'react';
// import MembersTab from './tabs/MembersTab';
// import AnnouncementsTab from './tabs/AnnouncementsTab';
// import ScheduleTab from './tabs/ScheduleTab';
// import AttendanceTab from './tabs/AttendanceTab';
// import MaterialsTab from './tabs/MaterialsTab';
import { useAuth } from '../../context/AuthContext';
import { Tabs } from './components/Tabs';
import MembersTab from './components/tab/Overview/MembersTab/MembersTab';
import OverviewTab from './components/tab/Overview/OverviewTab';
import './GroupManagementPage.css';

const GroupManagementPage = () => {
  const { user } = useAuth();
  const isClassRep = user?.role === 'classrep';
  const isStudent = user?.role === 'student';
  const group = {
    id: 'grp-12345',
    name: 'CSC 300 - Data Structures',
    department: 'Computer Science',
    faculty: 'Faculty of Science',
    level: '300',
    classRepName: 'Jane Doe',
    joinStatus: 'Accepted', // For student view: 'Pending' | 'Accepted'

    members: [
      { id: 'stu-1', name: 'Alice Johnson', role: 'student' },
      { id: 'stu-2', name: 'Bob Smith', role: 'student' },
      { id: 'stu-3', name: 'Clara James', role: 'assistant' },
      { id: 'stu-4', name: 'Daniel Lee', role: 'student' },
    ],

    pendingRequests: [
      { id: 'req-1', name: 'Eva Green', submittedAt: '2025-06-08T10:00:00Z' },
      { id: 'req-2', name: 'Felix Noah', submittedAt: '2025-06-09T14:30:00Z' },
    ],

    latestAnnouncement: {
      title: '📝 Midterm Exam Notice',
      body: 'The midterm exam has been moved to Friday at 9 AM. Please revise chapters 1–5 and be on time.',
      postedAt: '2025-06-07T16:00:00Z',
    },

    nextClass: {
      day: 'Wednesday',
      time: '10:00 AM – 12:00 PM',
      topic: 'Trees & Graphs',
      location: 'Room 3B',
    },
  };

  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'members', label: 'Members', show: isClassRep },
    { key: 'announcements', label: 'Announcements' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'materials', label: 'Materials' },
  ].filter((tab) => tab.show === undefined || tab.show);

  return (
    <div className="group-management-page">
      <Tabs
        tabs={tabs}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      <div className="tab-content">
        {selectedTab === 'overview' && (
          <OverviewTab
            user={user}
            group={group}
          />
        )}

        {selectedTab === 'members' && isClassRep && (
          <MembersTab groupId={group.id} />
        )}

        {/* {selectedTab === 'announcements' && (
          <AnnouncementsTab
            user={user}
            groupId={group.id}
          />
        )}

        {selectedTab === 'schedule' && (
          <ScheduleTab
            user={user}
            groupId={group.id}
          />
        )}

        {selectedTab === 'attendance' && (
          <AttendanceTab
            user={user}
            groupId={group.id}
          />
        )}

        {selectedTab === 'materials' && (
          <MaterialsTab
            user={user}
            groupId={group.id}
          />
        )} */}
      </div>
    </div>
  );
};

export default GroupManagementPage;
