import React from 'react';
import styles from './DynamicDayTimeSelector.module.css';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DynamicDayTimeSelector = ({ value = [], onChange }) => {
  const toggleDay = (day) => {
    const exists = value.find((d) => d.day === day);
    if (exists) {
      onChange(value.filter((d) => d.day !== day));
    } else {
      onChange([...value, { day, timing: { startTime: '', endTime: '' } }]);
    }
  };

  const updateTiming = (day, field, fieldValue) => {
    onChange(
      value.map((d) =>
        d.day === day
          ? { ...d, timing: { ...d.timing, [field]: fieldValue } }
          : d
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dayButtons}>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            className={`${styles.dayButton} ${
              value.find((d) => d.day === day) ? styles.active : ''
            }`}>
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className={styles.timeInputs}>
        {value.map(({ day, timing }) => (
          <div
            key={day}
            className={styles.timeRow}>
            <span className={styles.dayLabel}>{day}</span>
            <input
              type="time"
              value={timing.startTime}
              onChange={(e) => updateTiming(day, 'startTime', e.target.value)}
              className={styles.timeInput}
              required
            />
            <span className={styles.to}>to</span>
            <input
              type="time"
              value={timing.endTime}
              onChange={(e) => updateTiming(day, 'endTime', e.target.value)}
              className={styles.timeInput}
              required
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicDayTimeSelector;
