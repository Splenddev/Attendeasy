import styles from './DayTimeSlot.module.css';
import { LuCalendarClock } from 'react-icons/lu';

const DayTimeSlot = ({ daysTimes = [] }) => {
  return (
    <div className={styles.timings}>
      <b className={styles.title}>
        <LuCalendarClock /> Class Days & Times
      </b>
      <div className={styles.timingList}>
        {daysTimes.map((slot, idx) => (
          <div
            key={idx}
            className={styles.timeSlot}>
            {' '}
            <span className={styles.left}>
              {slot.day[0].toUpperCase() + slot.day.slice(1)}
            </span>
            <span className={styles.right}>
              {slot.timing.startTime} – {slot.timing.endTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayTimeSlot;
