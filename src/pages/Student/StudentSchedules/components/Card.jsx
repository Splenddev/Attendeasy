import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMapPin,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiDownload,
} from 'react-icons/fi';
import { formatTime, getFileIconClass } from './utils';
import styles from '../StudentSchedules.module.css';
import button from '../../../../components/Button/Button';
import { FaStickyNote } from 'react-icons/fa';

const Card = ({ schedule, isExpanded, onToggle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h3>{schedule.courseTitle}</h3>
        <p>
          {schedule.courseCode} • {schedule.creditUnit} Credits
        </p>

        <div className={styles.cardInfo}>
          <span>
            <FiUser /> {schedule.lecturerName}
          </span>
          <span>
            <FiMapPin /> {schedule.classroomVenue}
          </span>
          <span>
            <FiClock /> Time:{' '}
            {formatTime(schedule.classDaysTimes[0].timing.startTime)} -{' '}
            {formatTime(schedule.classDaysTimes[0].timing.endTime)}
          </span>
        </div>

        <button
          onClick={onToggle}
          className={styles.showBtn}>
          {isExpanded ? 'Show Less' : 'Show More'}
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.cardExpand}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <div className={styles.expandedContent}>
              <p>
                <strong>Department:</strong> {schedule.department}
              </p>
              <p>
                <strong>Notes:</strong> {schedule.notes}
              </p>
              <p>
                <strong>Materials:</strong>
              </p>
              {schedule.media?.map((file) => {
                const { icon, color } = getFileIconClass(file.fileType);
                const Icon = icon;
                return (
                  <div
                    key={file.id}
                    className={styles.mediaRow}>
                    <span className={styles.file}>
                      <Icon color={color} />
                      <p>{file.name}</p>
                    </span>
                    <FiDownload />
                  </div>
                );
              })}
              {button.multiple({
                icon: FaStickyNote,
                element: 'View attencance.',
                name: styles.attBtn,
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
