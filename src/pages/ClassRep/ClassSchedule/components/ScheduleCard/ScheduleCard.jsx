import { useState } from 'react';
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
  FaSyncAlt,
} from 'react-icons/fa';
import {
  FiFileText,
  FiVideo,
  FiImage,
  FiMusic,
  FiDownload,
  FiTrash,
  FiEdit2,
} from 'react-icons/fi';
import { HiClock, HiDocumentAdd } from 'react-icons/hi';
import {
  MdDoneAll,
  MdAutoDelete,
  MdMailOutline,
  MdOndemandVideo,
  MdFlag,
} from 'react-icons/md';
import { RiPulseFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styles from './ScheduleCard.module.css';
import {
  formatTimeDiff,
  parseTimeToday2,
  timeDiffLabel,
} from '../../../../../utils/helpers';
import FileUploadModal from '../../../../../components/Modals/FileUploadModal/FileUploadModal';
import { useScheduleMedia } from '../../../../../hooks/useScheduleMedia';
import { ConfirmModal } from '../../../../../components/Modals';

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

const ScheduleCard = ({ user, schedule = {}, isToday = false, refresh }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { handleDelete, deleting } = useScheduleMedia({
    scheduleId: schedule._id,
    onDeleted: () => {
      refresh?.();
      setConfirmOpen(false);
    },
  });

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

  const metaChip = (label, icon) => (
    <span className={styles.metaChip}>
      {icon} {label}
    </span>
  );

  return (
    <article
      className={`${styles.scheduleCard} ${
        cardStatus ? styles[`card${cardStatus}`] : ''
      }`}
      title={`${schedule.courseTitle} (${schedule.courseCode})`}>
      {/* Header */}
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
          {metaChip(schedule.repeat || schedule.repeatPattern, <FaSyncAlt />)}
          {schedule.isActive
            ? metaChip('ACTIVE', <RiPulseFill />)
            : metaChip('INACTIVE', <MdAutoDelete />)}
        </div>
      </header>

      {/* Status (if today) */}
      {cardStatus && isToday && (
        <div
          className={`${styles.statusBanner} ${styles[`banner${cardStatus}`]}`}>
          {cardStatus === 'completed' && (
            <>
              <MdDoneAll /> <span>Done</span>
            </>
          )}
          {cardStatus === 'ongoing' && (
            <>
              <RiPulseFill />
              <span>
                Ongoing – ends in{' '}
                {timeDiffLabel('untilEnd', todaySlots[0].timing.endTime)}
              </span>
            </>
          )}
          {cardStatus === 'upcoming' && (
            <>
              <HiClock />
              <span>
                Starts in{' '}
                {formatTimeDiff(
                  parseTimeToday2(todaySlots[0].timing.startTime)
                )}
              </span>
            </>
          )}
        </div>
      )}

      {/* Info */}
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

      {/* Timings */}
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

      {/* Media Section */}
      <section className={styles.mediaSection}>
        <h4>
          Attached Materials{' '}
          <div className={styles.action}>
            {schedule.mediaNeedsApproval && (
              <span
                className={styles.approvalFlag}
                title="Needs approval">
                <MdFlag size={18} />
              </span>
            )}
            <span className="center">
              <HiDocumentAdd
                size={18}
                title="Upload Media"
                className={styles.clickableIcon}
                onClick={() => setShowUploadModal(true)}
              />
              Add
            </span>
          </div>
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
                  <a
                    href={m.src}
                    download
                    target="_blank"
                    rel="noopener noreferrer">
                    <FiDownload />
                  </a>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      setSelectedMedia(m);
                      setConfirmOpen(true);
                    }}>
                    <FiTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <NavLink to={`/${user.role}/group-management`}>See all</NavLink>
      </section>

      {/* Footer */}
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

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        scheduleId={schedule._id}
        onSuccess={refresh}
        defaultRequireApproval={schedule.mediaNeedsApproval}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          console.log(selectedMedia);
          handleDelete(selectedMedia._id);
        }}
        loader={deleting}
        actionText="Delete"
        message={`This will delete "${selectedMedia?.name}" permanently.`}
      />
    </article>
  );
};

export default ScheduleCard;
