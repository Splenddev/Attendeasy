import { useState } from 'react';
// import MembersTab from './tabs/MembersTab';
// import AnnouncementsTab from './tabs/AnnouncementsTab';
// import ScheduleTab from './tabs/ScheduleTab';
// import AttendanceTab from './tabs/AttendanceTab';
// import MaterialsTab from './tabs/MaterialsTab';
import { useAuth } from '../../context/AuthContext';
import { Tabs } from './components/Tabs';
import OverviewTab from './components/tab/Overview/OverviewTab';
import MembersTab from './components/tab/Overview/MembersTab/MembersTab';
import './GroupManagementPage.css';

const GroupManagementPage = () => {
  const { user } = useAuth();
  const isClassRep = user?.role === 'class-rep';
  const isStudent = user?.role === 'student';
  const group = {
    id: 'grp-12345',
    name: 'CSC 300 - Data Structures',
    department: 'Computer Science',
    faculty: 'Faculty of Science',
    level: '300',
    classRepId: 'stu101',
    classRepName: 'Jane Doe',
    joinStatus: 'Accepted',

    members: [
      {
        id: 'stu101',
        name: 'Jane Doe',
        absenceRate: 12,
        email: 'jane.doe@university.edu',
        department: 'Computer Science',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinedAt: '2025-04-01T09:00:00Z',
      },
      {
        id: 'stu102',
        name: 'Victor A.',
        absenceRate: 4,
        email: 'victor.a@university.edu',
        department: 'Computer Science',
        avatar: 'https://i.pravatar.cc/150?img=11',
        joinedAt: '2025-04-05T13:15:00Z',
      },
      {
        id: 'stu103',
        name: 'Ahmed S.',
        absenceRate: 0,
        email: 'ahmed.s@university.edu',
        department: 'Computer Science',
        avatar: 'https://i.pravatar.cc/150?img=22',
        joinedAt: '2025-04-10T10:45:00Z',
      },
    ],

    // ID of currently assigned student assistant (optional)
    studentAssistant: 'stu102',

    // Simulates the assign assistant logic
    setAssistant: (id) => alert(`Assigned ${id} as assistant`),

    // Students requesting to join the group
    pendingRequests: [
      { id: 'req-1', name: 'Eva Green', submittedAt: '2025-06-08T10:00:00Z' },
      { id: 'req-2', name: 'Felix Noah', submittedAt: '2025-06-09T14:30:00Z' },
    ],

    // Announcement to show
    latestAnnouncement: {
      title: '📝 Midterm Exam Notice',
      body: 'The midterm exam has been moved to Friday at 9 AM. Please revise chapters 1–5 and be on time.',
      postedAt: '2025-06-07T16:00:00Z',
    },

    // Next class info
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
          <MembersTab
            user={user}
            group={group}
          />
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
