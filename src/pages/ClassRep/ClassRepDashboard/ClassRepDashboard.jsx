import React, { useEffect, useState, useMemo } from 'react';
import './ClassRepDashboard.css';
import { useAuth } from '../../../context/AuthContext';
import { schedule } from '../ClassSchedule/assets';
import AttendanceSection from './AttendanceSection';
import ScheduleSection from './ScheduleSection';

const getTodayName = () =>
  new Date().toLocaleString('en-US', { weekday: 'long' });

const getTodaySchedule = () => {
  const today = getTodayName();
  return schedule.flatMap((course) =>
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
  const { setNavTitle } = useAuth();
  useEffect(() => setNavTitle('Dashboard'), [setNavTitle]);

  const todaySchedules = useMemo(() => getTodaySchedule(), []);
  const [navMenu, setNavMenu] = useState('today');

  return (
    <div className="c-dashboard">
      <AttendanceSection
        navMenu={navMenu}
        setNavMenu={setNavMenu}
      />

      <ScheduleSection todaySchedules={todaySchedules} />
    </div>
  );
};

export default ClassRepDashboard;
