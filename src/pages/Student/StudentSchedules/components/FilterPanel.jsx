import React from 'react';
import styles from '../StudentSchedules.module.css';
import { FiGrid, FiList, FiSearch } from 'react-icons/fi';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const FiltersPanel = ({
  searchTerm,
  setSearchTerm,
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <div className={styles.filterBox}>
      <div className={styles.filterLeft}>
        <div className={styles.searchInput}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className={styles.daySelect}>
          <option value="All">All Days</option>
          {daysOfWeek.map((day) => (
            <option
              key={day}
              value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersPanel;
