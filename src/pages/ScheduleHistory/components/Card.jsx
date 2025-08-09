import { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaRegStickyNote,
  FaChalkboardTeacher,
  FaCalendarAlt,
} from 'react-icons/fa';
import {
  BsCheckCircle,
  BsXCircle,
  BsArrowRepeat,
  BsExclamationTriangle,
} from 'react-icons/bs';

import AttendanceModal from './AttendanceModal';
import styles from '../ScheduleHistory.module.css';

const statusMap = {
  held: { label: 'Held', icon: <BsCheckCircle />, color: '#2ecc71' },
  cancelled: { label: 'Cancelled', icon: <BsXCircle />, color: '#e74c3c' },
  postponed: {
    label: 'Postponed',
    icon: <BsExclamationTriangle />,
    color: '#f39c12',
  },
  rescheduled: {
    label: 'Rescheduled',
    icon: <BsArrowRepeat />,
    color: '#3498db',
  },
  missed: { label: 'Missed', icon: <BsXCircle />, color: '#95a5a6' },
  scheduled: { label: 'Scheduled', icon: <FaCalendarAlt />, color: '#bdc3c7' },
};

export default function ScheduleCard({ instance }) {
  const [open, setOpen] = useState(false);
  const status = statusMap[instance.classStatus] || statusMap['scheduled'];

  const date = new Date(instance.classDate);

  return (
    <motion.div
      className={styles.calendarCard}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.4 }}>
      <div className={styles.dateBox}>
        <span className={styles.month}>{format(date, 'MMM')}</span>
        <span className={styles.day}>{format(date, 'dd')}</span>
      </div>

      <div className={styles.section}>
        {instance.syllabusTopic && (
          <div className={styles.row}>
            🧠 <strong>Topic:</strong> {instance.syllabusTopic}
          </div>
        )}

        {(instance.updatedTime?.start ||
          instance.updatedLocation ||
          instance.deliveryMode) && (
          <div className={styles.row}>
            🕒 {instance.updatedTime?.start}–{instance.updatedTime?.end}
            {instance.updatedLocation && <> | 📍 {instance.updatedLocation}</>}
            {instance.deliveryMode && <> | 🎓 {instance.deliveryMode}</>}
          </div>
        )}
      </div>

      {(instance.lecturerMessage ||
        instance.feedbackFromLecturer ||
        instance.notes) && (
        <div className={styles.section}>
          {instance.lecturerMessage && (
            <div className={styles.row}>
              💬 <strong>Message:</strong> <em>{instance.lecturerMessage}</em>
            </div>
          )}
          {instance.feedbackFromLecturer && (
            <div className={styles.row}>
              ✍️ <strong>Feedback:</strong>{' '}
              <em>{instance.feedbackFromLecturer}</em>
            </div>
          )}
          {instance.notes && (
            <div className={styles.row}>
              📓 <strong>Notes:</strong> {instance.notes}
            </div>
          )}
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.row}>
          📊 <strong>Attendance:</strong> ✅{' '}
          {instance.attendanceSummary.totalPresent} &nbsp; ❌{' '}
          {instance.attendanceSummary.totalAbsent} &nbsp; ⏱️{' '}
          {instance.attendanceSummary.totalLate}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.creator}>
          👤 <strong>Created by:</strong> {instance.createdByName || 'Unknown'}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ backgroundColor: '#25aff3', color: '#fff' }}
          className={styles.viewBtn}
          onClick={() => setOpen(true)}>
          View Attendance
        </motion.button>
      </div>

      {open && (
        <AttendanceModal
          studentPresence={instance.studentPresence}
          onClose={() => setOpen(false)}
          date={instance.classDate}
        />
      )}
    </motion.div>
  );
}
