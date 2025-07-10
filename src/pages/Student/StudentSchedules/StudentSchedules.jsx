import React, { useState } from 'react';
import styles from './StudentSchedules.module.css';
import { FiGrid, FiList, FiBook } from 'react-icons/fi';
import { mockScheduleData } from './components/utils';
import FiltersPanel from './components/FilterPanel';
import StatsPanel from './components/StatusPanel';
import Card from './components/Card';

const StudentSchedules = () => {
  const [schedules] = useState(mockScheduleData);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDay, setSelectedDay] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  const filteredSchedules = schedules.filter((schedule) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      schedule.courseTitle.toLowerCase().includes(search) ||
      schedule.courseCode.toLowerCase().includes(search) ||
      schedule.lecturerName.toLowerCase().includes(search);

    const matchesDay =
      selectedDay === 'All' ||
      schedule.classDaysTimes.some((day) => day.day === selectedDay);

    return matchesSearch && matchesDay;
  });

  const toggleCardExpansion = (id) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>My Class Schedules</h1>
          <p>View and manage your class schedule and course materials</p>
        </header>

        <FiltersPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <StatsPanel schedules={schedules} />

        {filteredSchedules.length > 0 ? (
          <div
            className={
              viewMode === 'grid' ? styles.gridLayout : styles.listLayout
            }>
            {filteredSchedules.map((schedule) => (
              <Card
                key={schedule._id}
                schedule={schedule}
                isExpanded={!!expandedCards[schedule._id]}
                onToggle={() => toggleCardExpansion(schedule._id)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FiBook size={48} />
            <h3>No schedules found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSchedules;
