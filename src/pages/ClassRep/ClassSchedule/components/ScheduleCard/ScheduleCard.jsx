import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import {
  FiFileText,
  FiVideo,
  FiImage,
  FiMusic,
  FiDownload,
  FiTrash,
} from 'react-icons/fi';
import { HiClock } from 'react-icons/hi';
import { RiPulseFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styles from './ScheduleCard.module.css';
import { MdPunchClock, MdAccessTime, MdDoneAll } from 'react-icons/md';

// ───────────────── helpers ─────────────────
const TODAY = new Date().toLocaleDateString(undefined, { weekday: 'long' });

const toTodayDate = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

const slotStatus = (startT, endT) => {
  const now = new Date();
  const start = toTodayDate(startT);
  const end = toTodayDate(endT);
  if (now >= end) return 'completed'; // Done
  if (now >= start && now < end) return 'ongoing'; // Now
  return 'upcoming'; // Soon
};
// ──────────────────────────────────────────

const fileTypeIcons = {
  doc: <FiFileText />,
  video: <FiVideo />,
  image: <FiImage />,
  audio: <FiMusic />,
};

const ScheduleCard = ({ user, schedule = {}, isToday = false }) => {
  // evaluate each time-slot for today
  const todaySlots = (schedule.classDaysTimes || []).filter(
    (s) => s.day === TODAY
  );

  const statusesToday = todaySlots.map((s) =>
    slotStatus(s.timing.startTime, s.timing.endTime)
  );

  // pick “strongest” status to tint the card border
  const cardStatus = statusesToday.includes('ongoing')
    ? 'ongoing'
    : statusesToday.includes('upcoming')
    ? 'upcoming'
    : statusesToday.includes('completed')
    ? 'completed'
    : null;

  return (
    <div
      className={`${styles.scheduleCard} ${
        cardStatus ? styles[`card${cardStatus}`] : ''
      }`}>
      {/* ─ header ─ */}
      <div className={styles.header}>
        <h2>
          {schedule.courseTitle} ({schedule.courseCode})
        </h2>
        <div className={styles.others}>
          <span className={styles.repeat}>{schedule.repeat}</span>
          {cardStatus && isToday && (
            <div
              className={`${styles.statusBanner} ${
                styles[`banner${cardStatus}`]
              }`}>
              {cardStatus === 'completed' && (
                <>
                  <MdDoneAll /> <span>Done</span>
                </>
              )}
              {cardStatus === 'ongoing' && (
                <>
                  <RiPulseFill /> <span className="cap">{cardStatus}</span>
                </>
              )}
              {cardStatus === 'upcoming' && (
                <>
                  <HiClock /> <span className="cap">{cardStatus}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─ info ─ */}
      <div className={styles.info}>
        <p>
          <FaChalkboardTeacher /> <strong>{schedule.lecturerName}</strong>
        </p>
        <p>
          <FaMapMarkerAlt /> {schedule.classroomVenue}
        </p>
        <p>
          <FaBookOpen /> {schedule.level} Level – {schedule.department},{' '}
          {schedule.faculty}
        </p>
      </div>

      {/* ─ timings ─ */}
      <h4 className={styles.timingsHeader}>Timings</h4>
      <div className={styles.timings}>
        {(schedule.classDaysTimes || []).map(({ day, timing }) => {
          return (
            <div
              key={day + timing.startTime}
              className={styles.timeSlot}>
              <FaClock className={styles.clockIcon} />
              <strong>{day}</strong>
              <span>
                {timing.startTime} – {timing.endTime}
              </span>
            </div>
          );
        })}
      </div>

      {/* ─ media ─ */}
      <div className={styles.mediaSection}>
        <h4>Attached Media</h4>
        <ul className={styles.mediaList}>
          {(schedule.media || []).slice(0, 4).map((m) => (
            <li
              key={m.id}
              className={`${styles.mediaItem} ${
                m.approved ? styles.approved : styles.pending
              }`}>
              <span>{fileTypeIcons[m.fileType]}</span>
              <div>
                <span
                  className={styles.title}
                  title={m.name}>
                  {m.name}
                </span>
                <small>
                  {m.dateAdded} | {m.timeAdded}
                </small>
              </div>
              <div className={styles.actions}>
                <FiDownload />
                <FiTrash />
              </div>
            </li>
          ))}
        </ul>
        <NavLink to={`/${user.role}/group-management`}>See all</NavLink>
      </div>

      {/* ─ footer ─ */}
      <div className={styles.footer}>
        <p>
          Attendance Marking:{' '}
          <strong>
            {schedule.allowAttendanceMarking ? 'Enabled' : 'Disabled'}
          </strong>
        </p>
        <p>
          Notify: <strong>{schedule.notificationLeadTime} mins early</strong>
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
