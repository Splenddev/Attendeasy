// AlertModal.jsx
import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaStopwatch } from 'react-icons/fa';
import styles from './AlertModal.module.css';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

// —— helpers ———————————————————————————————————————————
const toTodayDate = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

const statusOf = (start, end, now) => {
  if (now >= end) return 'completed';
  if (now >= start && now < end) return 'ongoing';
  return 'upcoming';
};

const chipLabel = {
  completed: 'Done',
  ongoing: 'Now',
  upcoming: 'Soon',
};
// ——————————————————————————————————————————————————————

const AlertModal = ({ todaySchedules = [], onClose }) => {
  // close on backdrop click
  useEffect(() => {
    const handleOutside = (e) =>
      e.target.classList.contains(styles.modalBackdrop) && onClose();
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [onClose]);

  // augment + sort schedules
  const schedules = useMemo(() => {
    const now = new Date();
    return todaySchedules
      .map((s) => {
        const start = toTodayDate(s.startTime);
        const assumedEnd = new Date(start.getTime() + 60 * 60 * 1000);
        const end = s.endTime ? toTodayDate(s.endTime) : assumedEnd;
        const status = statusOf(start, end, now);
        return { ...s, start, end, status };
      })
      .sort((a, b) => a.start - b.start);
  }, [todaySchedules]);

  const ongoing = schedules.find((s) => s.status === 'ongoing');
  const nextUpcoming = schedules.find((s) => s.status === 'upcoming');

  // counts for header summary
  const counts = schedules.reduce(
    (acc, s) => ({ ...acc, [s.status]: acc[s.status] + 1 }),
    { completed: 0, ongoing: 0, upcoming: 0 }
  );

  return (
    <div
      className={styles.modalBackdrop}
      role="dialog"
      aria-modal="true">
      <AnimatePresence>
        <motion.div
          className={styles.modalBox}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35, type: 'spring' }}>
          {/* — header — */}
          <header className={styles.modalHeader}>
            <FiCalendar className={styles.headerIcon} />
            <h2>Today’s Schedule</h2>
            <button
              className={styles.closeBtn}
              onClick={onClose}>
              <FiX />
            </button>
          </header>

          {/* — body — */}
          <section className={styles.modalContent}>
            {schedules.length ? (
              <>
                <p className={styles.summary}>
                  {counts.ongoing > 0 && (
                    <>
                      <FaStopwatch /> <strong>{counts.ongoing}</strong>{' '}
                      ongoing.&nbsp;
                    </>
                  )}
                  {counts.completed > 0 && (
                    <>
                      <FiCheckCircle /> <strong>{counts.completed}</strong>{' '}
                      completed.&nbsp;
                    </>
                  )}
                  {counts.upcoming > 0 && (
                    <>
                      <FiCalendar /> <strong>{counts.upcoming}</strong>{' '}
                      upcoming.
                    </>
                  )}
                </p>

                <ul className={styles.taskList}>
                  {schedules.map((s, idx) => (
                    <motion.li
                      key={idx}
                      className={styles.taskItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}>
                      <span className={styles.code}>{s.courseCode}</span>
                      <span className={styles.time}>
                        {s.startTime}&nbsp;–&nbsp;{s.endTime || '??:??'}
                      </span>

                      <span
                        className={
                          s.status === 'ongoing'
                            ? styles.badgeOngoing
                            : s.status === 'completed'
                            ? styles.badgeDone
                            : styles.badgeUpcoming
                        }
                        title={chipLabel[s.status]}>
                        {chipLabel[s.status]}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {ongoing && (
                  <p className={styles.tip}>
                    <FaStopwatch />
                    <span>
                      Ongoing:&nbsp;
                      <strong>{ongoing.courseCode}</strong> until{' '}
                      {ongoing.endTime}
                    </span>
                  </p>
                )}

                {!ongoing && nextUpcoming && (
                  <p className={styles.tip}>
                    <FaStopwatch />
                    <span>
                      Next:&nbsp;
                      <strong>{nextUpcoming.courseCode}</strong> at{' '}
                      {nextUpcoming.startTime}
                    </span>
                  </p>
                )}
              </>
            ) : (
              <motion.p
                className={styles.emptyMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                🎉 No schedule for today. Enjoy some rest or review past topics!
              </motion.p>
            )}
          </section>

          {/* — footer — */}
          <footer className={styles.modalFooter}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className={styles.dismissBtn}>
              Got it!
            </motion.button>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AlertModal;
