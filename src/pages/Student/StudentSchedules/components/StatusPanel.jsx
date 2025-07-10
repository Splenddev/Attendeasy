import React from 'react';
import styles from '../StudentSchedules.module.css';
import { FiBook, FiClock, FiUsers, FiFileText } from 'react-icons/fi';

const StatsPanel = ({ schedules }) => {
  const totalCourses = schedules.length;
  const totalClassesThisWeek = schedules.reduce(
    (total, schedule) => total + (schedule.classDaysTimes?.length || 0),
    0
  );
  const totalCredits = schedules.reduce(
    (total, schedule) => total + parseInt(schedule.creditUnit || 0),
    0
  );
  const totalMaterials = schedules.reduce(
    (total, schedule) => total + (schedule.media?.length || 0),
    0
  );

  const stats = [
    {
      icon: (
        <FiBook
          size={28}
          className={styles.statIcon}
        />
      ),
      label: 'Total Courses',
      value: totalCourses,
    },
    {
      icon: (
        <FiClock
          size={28}
          className={styles.statIcon}
        />
      ),
      label: 'This Week',
      value: totalClassesThisWeek,
    },
    {
      icon: (
        <FiUsers
          size={28}
          className={styles.statIcon}
        />
      ),
      label: 'Total Credits',
      value: totalCredits,
    },
    {
      icon: (
        <FiFileText
          size={28}
          className={styles.statIcon}
        />
      ),
      label: 'Materials',
      value: totalMaterials,
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={styles.statCard}>
          <div className={styles.statContent}>
            {stat.icon}
            <div>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
