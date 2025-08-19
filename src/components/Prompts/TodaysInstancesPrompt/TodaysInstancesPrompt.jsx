import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './TodaysInstancesPrompt.module.css';
import { dateFormatter } from '../../../utils/helpers';
import { FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { useMain } from '../../../context/MainContext';
import { LuChevronDown, LuChevronUp, LuX } from 'react-icons/lu';

export default function TodaysInstancesPrompt({
  instances,
  promptMessage,
  onConfirm,
  onDismiss,
  variant = 'default', // 'default', 'warning', 'error', 'dark'
}) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const { isMobile } = useMain();

  // status config for flexibility
  const statusConfig = {
    unconfirmed: {
      label: 'Unconfirmed',
      icon: <FaClock className={styles.icon} />,
      style: styles.unconfirmedBadge,
    },
    confirmed: {
      label: 'Confirmed',
      icon: <FaCheck className={styles.icon} />,
      style: styles.confirmedBadge,
    },
    cancelled: {
      label: 'Cancelled',
      icon: <FaTimes className={styles.icon} />,
      style: styles.cancelledBadge,
    },
  };

  // Expand if urgent (pending/unconfirmed or today’s classes)
  useEffect(() => {
    const hasUrgentInstances = instances?.some(
      (instance) =>
        instance.classStatus === 'unconfirmed' ||
        new Date(instance.classDate).toDateString() ===
          new Date().toDateString()
    );
    if (hasUrgentInstances) setIsCollapsed(false);
  }, [instances]);

  // Hide entirely if nothing to show
  if (
    !instances ||
    instances.length === 0 ||
    !isVisible ||
    (pathParts.includes('schedules') && pathParts.includes('history'))
  ) {
    return null;
  }

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const dismissPrompt = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const wrapperClasses = [
    styles.wrapper,
    variant !== 'default' ? styles[variant] : '',
    isMobile ? styles.mobile : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {/* Header / Toggle */}
      <div
        className={styles.header}
        onClick={toggleCollapse}
        role="button"
        aria-expanded={!isCollapsed}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapse();
          }
        }}>
        <span className={styles.badge}>{instances.length}</span>
        <span>
          Heads up! You’ve got {instances.length} unconfirmed class session
          {instances.length !== 1 ? 's' : ''} waiting for your review.
        </span>
        <div className={styles.cta}>
          <button
            className={styles.closeBtn}
            aria-label="collapse notification">
            {isCollapsed ? <LuChevronDown /> : <LuChevronUp />}
          </button>
          {onDismiss && (
            <button
              className={styles.closeBtn}
              onClick={dismissPrompt}
              aria-label="Dismiss notification">
              <LuX />
            </button>
          )}
        </div>
      </div>

      {/* Animate list expand/collapse */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.ul
            className={styles.list}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            {instances.map((instance) => {
              const status =
                statusConfig[instance.classStatus] || statusConfig.unconfirmed;

              return (
                <motion.li
                  key={instance._id}
                  className={styles.listItem}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}>
                  <div className={styles.instanceInfo}>
                    <div className={styles.infoRow}>
                      <strong>Class Date:</strong>
                      <span>{dateFormatter(instance.classDate)}</span>
                    </div>

                    <div className={styles.infoRow}>
                      <strong>Class Status:</strong>
                      <div className={styles.statusWrapper}>
                        <span className={status.style}>
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {instance.courseName && (
                      <div className={styles.infoRow}>
                        <strong>Course:</strong>
                        <span>{instance.courseName}</span>
                      </div>
                    )}

                    <div className={styles.actionRow}>
                      <button
                        onClick={() =>
                          onConfirm(
                            instance.scheduleId?._id,
                            instance.courseName
                          )
                        }
                        className={styles.confirmBtn}>
                        Confirm Status
                      </button>

                      {instance.virtualLink && (
                        <a
                          href={instance.virtualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkBtn}>
                          Join Class
                        </a>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
