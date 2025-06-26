import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import styles from './ScheduleCard.module.css';
import {
  FiFileText,
  FiVideo,
  FiImage,
  FiMusic,
  FiDownload,
  FiTrash,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const fileTypeIcons = {
  doc: <FiFileText />,
  video: <FiVideo />,
  image: <FiImage />,
  audio: <FiMusic />,
};

const ScheduleCard = ({ user, schedule = [] }) => (
  <div className={styles.scheduleCard}>
    <div className={styles.header}>
      <h2>
        {schedule.courseTitle} ({schedule.courseCode})
      </h2>
      <span className={styles.repeat}>{schedule.repeat}</span>
    </div>

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

    <h4 className={styles.timingsHeader}>Timings</h4>
    <div className={styles.timings}>
      {schedule.classDaysTimes.map(({ day, timing }) => (
        <div
          key={day + timing.startTime}
          className={styles.timeSlot}>
          <FaClock className={styles.clockIcon} />
          <strong>{day}</strong>
          <span>
            {timing.startTime} – {timing.endTime}
          </span>
        </div>
      ))}
    </div>

    <div className={styles.mediaSection}>
      <h4>Attached Media</h4>
      <ul className={styles.mediaList}>
        {schedule.media.slice(0, 4).map((media) => (
          <li
            key={media.id}
            className={`${styles.mediaItem} ${
              media.approved ? styles.approved : styles.pending
            }`}>
            <span>{fileTypeIcons[media.fileType]}</span>
            <div>
              <span
                className={styles.title}
                title={media.name}>
                {media.name}
              </span>

              <small>
                {media.dateAdded} | {media.timeAdded}
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
export default ScheduleCard;
