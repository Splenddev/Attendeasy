import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiX } from 'react-icons/fi';
import styles from './AlertModal.module.css';
import { MdCountertops } from 'react-icons/md';
import { FaStopwatch } from 'react-icons/fa';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

const AlertModal = ({ todaySchedules, onClose }) => {
  // Close on backdrop click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(styles.modalBackdrop)) onClose();
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [onClose]);

  const nextClass = todaySchedules?.[0];

  return (
    <div className={styles.modalBackdrop}>
      <AnimatePresence>
        <motion.div
          className={styles.modalBox}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35, type: 'spring' }}>
          <header className={styles.modalHeader}>
            <FiCalendar className={styles.headerIcon} />
            <h2>Today’s Schedule</h2>
            <button
              className={styles.closeBtn}
              onClick={onClose}>
              <FiX />
            </button>
          </header>

          <section className={styles.modalContent}>
            {todaySchedules.length > 0 ? (
              <>
                <p className={styles.summary}>
                  You have <strong>{todaySchedules.length}</strong> task
                  {todaySchedules.length > 1 && 's'} today.
                </p>

                <ul className={styles.taskList}>
                  {todaySchedules.map((s, idx) => (
                    <motion.li
                      key={idx}
                      className={styles.taskItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}>
                      <span className={styles.code}>{s.courseCode}</span>
                      <span className={styles.time}>
                        Starts at {s.startTime}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {nextClass && (
                  <p className={styles.tip}>
                    <FaStopwatch />
                    <span>
                      Next class: <strong>{nextClass.courseCode}</strong> at{' '}
                      {nextClass.startTime}
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
