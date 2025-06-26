import React, { useEffect, useState, useMemo } from 'react';
import './ClassRepDashboard.css';
import { useAuth } from '../../../context/AuthContext';
import { scheduleJson } from '../ClassSchedule/assets';
import AttendanceSection from './AttendanceSection';
import ScheduleSection from './ScheduleSection';
import TopSummaryCards from './TopSummaryCards';
import { useNavigate } from 'react-router-dom';
import ClassOverview from './ClassOverview';

const getTodayName = () =>
  new Date().toLocaleString('en-US', { weekday: 'long' });

const getTodaySchedule = () => {
  const today = getTodayName();
  return scheduleJson.flatMap((course) =>
    course.classDaysTimes
      .filter(({ day }) => day === today)
      .map(({ timing }) => ({
        time: {
          start:
            new Date().toISOString().split('T')[0] + 'T' + timing.startTime,
          end: new Date().toISOString().split('T')[0] + 'T' + timing.endTime,
        },
        course: {
          code: course.courseCode,
          title: course.courseTitle,
          lecturer: course.lecturerName,
        },
      }))
  );
};

const ClassRepDashboard = () => {
  const { setNavTitle, user } = useAuth();
  useEffect(() => setNavTitle('Dashboard'), [setNavTitle]);

  const navigate = useNavigate();

  const todaySchedules = useMemo(() => getTodaySchedule(), []);
  const [navMenu, setNavMenu] = useState('today');

  return (
    <div className="c-dashboard">
      <TopSummaryCards
        data={{
          totalStudents: 38,
          classesToday: todaySchedules.length,
          pendingPleas: 4,
          pendingMedia: 2,
        }}
      />
      <AttendanceSection
        navMenu={navMenu}
        setNavMenu={setNavMenu}
      />

      <ClassOverview
        overview={{
          groupName: 'CSC 300 - Software Engineering',
          department: 'Computer Science',
          faculty: 'Science',
          level: '300',
          pendingRequests: 3,
          activeAssignments: 2,
          upcomingDeadlines: 1,
          unreadNotifications: 5,
        }}
      />

      <ScheduleSection todaySchedules={todaySchedules} />
    </div>
  );
};

export default ClassRepDashboard;
