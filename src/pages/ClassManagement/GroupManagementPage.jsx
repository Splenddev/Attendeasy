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
import { Tabs } from './components/Tabs';
import GroupSidebar from './components/GroupSidebar/GroupSidebar';
import GroupContents from './components/GroupContents/GroupContents';
const group = {
  name: 'CSC 301 - Data Structures',
  faculty: 'Science',
  department: 'Computer Science',
  level: '300',
  classRepName: 'Jane Doe',
  description:
    'This group handles all communications and activities for CSC 301. Ensure you keep up with announcements and attendance.',
  members: [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Class Rep',
    },
    {
      id: 2,
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Student',
    },
    {
      id: 3,
      name: 'Mary Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Student',
    },
    {
      id: 4,
      name: 'Mike Brown',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'Student',
    },
  ],

  // New fields added for OverviewTab compatibility:
  joinedStudents: [
    { id: 2, name: 'John Smith' },
    { id: 3, name: 'Mary Johnson' },
    { id: 4, name: 'Mike Brown' },
  ],
  leftStudents: [{ id: 5, name: 'Chris Walker' }],

  completedClasses: 12,
  submittedAttendance: 11,

  attendanceRecords: [
    {
      date: '2025-06-01',
      presentStudentIds: [1, 2, 3], // Jane, John, Mary
    },
    {
      date: '2025-06-03',
      presentStudentIds: [1, 2, 4], // Jane, John, Mike
    },
    {
      date: '2025-06-05',
      presentStudentIds: [1, 2], // Jane, John
    },
    {
      date: '2025-06-10',
      presentStudentIds: [1, 3, 4], // Jane, Mary, Mike
    },
  ],

  lastAttendanceDate: '2025-06-10T09:00:00Z',

  attendanceTrends: [5, 20, 35, 38, 36, 40], // Total students present over recent classes

  topAbsentees: [
    { name: 'Mary Johnson', count: 4 },
    { name: 'Mike Brown', count: 3 },
  ],

  engagementStats: {
    announcements: 6,
    acknowledgements: 75,
  },

  nextClass: {
    day: 'Wednesday',
    time: '10:00 AM – 12:00 PM',
    topic: 'Stacks and Queues',
    location: 'Lecture Room 5, CS Building',
  },

  latestAnnouncement: {
    title: 'Midterm Review Class',
    body: 'There will be a special review session this Friday covering all topics from weeks 1–6. Attendance is highly recommended.',
    postedAt: '2025-06-10T14:30:00Z',
  },
  announcements: [
    {
      id: 1,
      title: 'Midterm Review Class',
      body: 'There will be a special review session this Friday covering all topics from weeks 1–6. Attendance is highly recommended.',
      postedAt: '2025-06-10T14:30:00Z',
      type: 'class', // 📘 Class Info
    },
    {
      id: 2,
      title: 'Assignment 2 Deadline',
      body: 'Submit your second assignment on Linked Lists by Sunday night. Late submissions will incur penalties.',
      postedAt: '2025-06-11T10:00:00Z',
      type: 'assignment', // 📚 Assignment Reminder
    },
    {
      id: 3,
      title: 'Media Upload Notice',
      body: 'Lecture recording for Week 5 has been uploaded. Access it from the materials section.',
      postedAt: '2025-06-09T16:45:00Z',
      type: 'media', // 🎥 Media Notice
    },
    {
      id: 4,
      title: 'No Class Next Monday',
      body: 'Due to a public holiday, there will be no class next Monday. Use the time to revise.',
      postedAt: '2025-06-08T12:00:00Z',
      type: 'general', // 🗓 General Announcement
    },
  ],
};

const GroupManagementPage = () => {
  const { user, setNavTitle } = useAuth();
  useEffect(() => setNavTitle('Group Management'), [setNavTitle]);

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
