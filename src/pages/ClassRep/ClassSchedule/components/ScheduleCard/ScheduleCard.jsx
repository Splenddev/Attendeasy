import { useState } from 'react';
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
  FaStickyNote,
  FaSyncAlt,
} from 'react-icons/fa';
import {
  FiFileText,
  FiVideo,
  FiImage,
  FiMusic,
  FiDownload,
  FiChevronUp,
  FiChevronDown,
  FiUploadCloud,
} from 'react-icons/fi';
import { HiClock } from 'react-icons/hi';
import { MdDoneAll, MdAutoDelete, MdOndemandVideo } from 'react-icons/md';
import { RiPulseFill } from 'react-icons/ri';
import styles from './ScheduleCard.module.css';
import {
  formatTimeDiff,
  parseTimeToday2,
  timeDiffLabel,
} from '../../../../../utils/helpers';
import FileUploadModal from '../../../../../components/Modals/FileUploadModal/FileUploadModal';
import { useScheduleMedia } from '../../../../../hooks/useScheduleMedia';
import { ConfirmModal } from '../../../../../components/Modals';
import button from '../../../../../components/Button/Button';
import { getFileIconClass } from '../../../../Student/StudentSchedules/components/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LuBookCheck,
  LuBookOpen,
  LuCalendarClock,
  LuTrash,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const TODAY = new Date().toLocaleDateString(undefined, { weekday: 'long' });

const slotStatus = (startT, endT) => {
  const now = new Date();
  const start = parseTimeToday2(startT);
  const end = parseTimeToday2(endT);
  if (now >= end) return 'completed';
  if (now >= start && now < end) return 'ongoing';
  return 'upcoming';
};

const ScheduleCard = ({
  user,
  schedule = {},
  isToday = false,
  refresh,
  isExpanded,
  onToggle,
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();

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
        <div className={styles.topRow}>
          <h2 className={styles.courseTitle}>
            {schedule.courseTitle} ({schedule.courseCode})
            <span className={styles.creditUnit}>
              {schedule.creditUnit} Unit
            </span>
          </h2>
          {/* <button className={styles.editBtn}>
            <FiEdit2 />
          </button> */}
        </div>

        <div className={styles.badges}>
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
            ? metaChip('Active', <RiPulseFill />)
            : metaChip('Inactive', <MdAutoDelete />)}
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
        <div className={styles.infoRow}>
          <FaChalkboardTeacher className={styles.icon} />
          <span className={styles.label}>{schedule.lecturerName}</span>
        </div>
        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <span className={styles.label}>{schedule.classroomVenue}</span>
        </div>
        <div className={styles.infoRow}>
          <LuBookCheck className={styles.icon} />
          <span className={styles.label}>
            {schedule.level} – {schedule.department}, {schedule.faculty}
          </span>
        </div>
      </section>

      <div className={styles.timings}>
        <b className={styles.title}>
          <LuCalendarClock /> Class Days & Times
        </b>
        <div className={styles.timingList}>
          {schedule.classDaysTimes.map((slot, idx) => (
            <div
              key={idx}
              className={styles.timeSlot}>
              {' '}
              <div className={styles.left}>
                <p className={styles.day}>
                  {slot.day[0].toUpperCase() + slot.day.slice(1)}
                </p>
              </div>
              <div className={styles.right}>
                <p className={styles.time}>
                  {slot.timing.startTime} – {slot.timing.endTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {button.multiple({
        icon: isExpanded ? FiChevronUp : FiChevronDown,
        element: isExpanded ? 'Collapse Materials' : 'Show Materials',
        name: styles.showBtn,
        func: () => onToggle(),
      })}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.cardExpand}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            {schedule.media.length === 0 ? (
              <div className={styles.emptyBox}>
                <FiUploadCloud className={styles.icon} />
                <div className={styles.textGroup}>
                  <h4 className={styles.title}>No Class Media Available</h4>
                  <button
                    className={styles.uploadButton}
                    onClick={() => navigate(`/${user.role}/group-library`)}>
                    Upload Class Material
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.expandedContent}>
                <p>
                  <strong>Materials:</strong>
                </p>
                {schedule.media?.slice(0, 2).map((file) => {
                  const { icon, color } = getFileIconClass(file.fileType);
                  const Icon = icon;
                  return (
                    <div
                      key={file.id}
                      className={styles.mediaRow}>
                      <span className={styles.file}>
                        <Icon color={color} />
                        <div className={styles.top}>
                          <p>{file.name}</p>
                          <span>41kb</span>
                        </div>
                      </span>
                      <div className={styles.actions}>
                        <LuTrash
                          onClick={() => {
                            setConfirmOpen(true);
                            setSelectedMedia(file);
                          }}
                        />
                        <FiDownload />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
