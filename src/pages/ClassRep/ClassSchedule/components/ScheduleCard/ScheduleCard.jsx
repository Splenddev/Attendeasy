// ScheduleCard.jsx
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
  FaPenAlt,
  FaSyncAlt,
} from 'react-icons/fa';
import {
  FiFileText,
  FiVideo,
  FiImage,
  FiMusic,
  FiDownload,
  FiTrash,
  FiEdit,
  FiEdit2,
} from 'react-icons/fi';
import { HiClock, HiDocumentAdd } from 'react-icons/hi';
import { RiFileAddLine, RiPulseFill } from 'react-icons/ri';
import {
  MdDoneAll,
  MdAutoDelete,
  MdMailOutline,
  MdOndemandVideo,
  MdEditAttributes,
  MdEditDocument,
  MdFlag,
  MdPending,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import styles from './ScheduleCard.module.css';
import { parseTimeToday2, timeDiffLabel } from '../../../../../utils/helpers';

const TODAY = new Date().toLocaleDateString(undefined, { weekday: 'long' });

const slotStatus = (startT, endT) => {
  const now = new Date();
  const start = parseTimeToday2(startT);
  const end = parseTimeToday2(endT);
  if (now >= end) return 'completed';
  if (now >= start && now < end) return 'ongoing';
  return 'upcoming';
};

const fileTypeIcons = {
  doc: <FiFileText />,
  video: <FiVideo />,
  image: <FiImage />,
  audio: <FiMusic />,
};

const ScheduleCard = ({ user, schedule = {}, isToday = false }) => {
  const todaySlots = (schedule.classDaysTimes || []).filter(
    (s) => s.day === TODAY
  );
  const statusesToday = todaySlots.map((s) =>
    slotStatus(s.timing.startTime, s.timing.endTime)
  );
  const cardStatus = statusesToday.includes('ongoing')
    ? 'ongoing'
    : statusesToday.includes('upcoming')
    ? 'upcoming'
    : statusesToday.includes('completed')
    ? 'completed'
    : null;

  /** ─ helpers ─ */
  const metaChip = (label, icon) => (
    <span className={styles.metaChip}>
      {icon} {label}
    </span>
  );

  return (
    <article
      role="article"
      className={`${styles.scheduleCard} ${
        cardStatus ? styles[`card${cardStatus}`] : ''
      }`}
      title={`${schedule.courseTitle} (${schedule.courseCode})`}>
      {/* ─ header ─ */}
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>
            {schedule.courseTitle} ({schedule.courseCode})
            <span className={styles.creditUnit}>
              {schedule.creditUnit} Unit
            </span>
          </h2>

          <div className={styles.action}>
            <FiEdit2 />
          </div>
        </div>

        <div className={styles.headerBadges}>
          {metaChip(
            schedule.classType,
            schedule.classType === 'Physical' ? (
              <FaMapMarkerAlt />
            ) : (
              <MdOndemandVideo />
            )
          )}
          {metaChip(schedule.repeat, <FaSyncAlt />)}
          {schedule.isActive
            ? metaChip('ACTIVE', <RiPulseFill />)
            : metaChip('INACTIVE', <MdAutoDelete />)}
        </div>
      </header>

      {/* ─ status banner (today only) ─ */}
      {cardStatus && isToday && (
        <div
          aria-label={`Class ${cardStatus}`}
          className={`${styles.statusBanner} ${styles[`banner${cardStatus}`]}`}>
          {cardStatus === 'completed' && (
            <>
              <MdDoneAll /> <span>Done</span>
            </>
          )}
          {cardStatus === 'ongoing' && (
            <>
              <RiPulseFill />{' '}
              <span>
                Ongoing - ends in{' '}
                {timeDiffLabel('untilEnd', todaySlots[0].timing.endTime)}
              </span>
            </>
          )}
          {cardStatus === 'upcoming' && (
            <>
              <HiClock />{' '}
              <span>
                Starts in{' '}
                {timeDiffLabel('untilStart', todaySlots[0].timing.startTime)}
              </span>
            </>
          )}
        </div>
      )}

      {/* ─ lecturer & venue ─ */}
      <section className={styles.info}>
        <p>
          <FaChalkboardTeacher /> <strong>{schedule.lecturerName}</strong>{' '}
          <a
            href={`mailto:${schedule.lecturerEmail}`}
            title="Email lecturer">
            <MdMailOutline />
          </a>
        </p>
        <p>
          <FaMapMarkerAlt /> {schedule.classroomVenue}
        </p>
        <p>
          <FaBookOpen /> {schedule.level} – {schedule.department},{' '}
          {schedule.faculty}
        </p>
      </section>

      {/* ─ timings ─ */}
      <h4 className={styles.timingsHeader}>Timings</h4>
      <div className={styles.timings}>
        {(schedule.classDaysTimes || []).map(({ day, timing }) => (
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

      {/* ─ media ─ */}
      <section className={styles.mediaSection}>
        <h4>
          Attached Media{' '}
          {!schedule.mediaNeedsApproval && (
            <>
              <div className={styles.action}>
                <span
                  className={styles.approvalFlag}
                  title="Needs approval">
                  <MdFlag size={18} />
                </span>
                <HiDocumentAdd size={18} />
              </div>
            </>
          )}
        </h4>

        {schedule.media.length === 0 ? (
          <p className={styles.noMedia}>No media yet</p>
        ) : (
          <ul className={styles.mediaList}>
            {schedule.media.slice(0, 4).map((m) => (
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
        )}
        <NavLink to={`/${user.role}/group-management`}>See all</NavLink>
      </section>

      {/* ─ footer ─ */}
      <footer className={styles.footer}>
        {metaChip(
          `Attendance: ${
            schedule.allowAttendanceMarking ? 'Enabled' : 'Disabled'
          }`,
          <FaClock />
        )}
        {metaChip(`${schedule.notificationLeadTime} min notice`, <HiClock />)}
        {metaChip(
          `Auto-end: ${schedule.autoEnd ? 'ON' : 'OFF'}`,
          <MdAutoDelete />
        )}
      </footer>
    </article>
  );
};

export default ScheduleCard;
