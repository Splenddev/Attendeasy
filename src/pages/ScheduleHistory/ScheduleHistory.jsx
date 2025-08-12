import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScheduleHistory.module.css';
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuMessageCircle,
  LuFileText,
  LuChevronDown,
  LuPause,
  LuRotateCcw,
  LuMonitor,
  LuWifi,
  LuTriangleAlert,
  LuCircleCheck,
  LuCircleX,
  LuCalendarClock,
  LuActivity,
  LuCirclePlay,
  LuClipboardPlus,
  LuSearchSlash,
  LuSearchX,
} from 'react-icons/lu';

import { FaHome, FaUsers } from 'react-icons/fa';
import button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import LecturerMessage from './components/LecturerMessage/LecturerMessage';
import { useLocation, useParams } from 'react-router-dom';
import { useScheduleInstance } from '../../hooks/useScheduleInstance';
import { CLASS_STATUS_TABS, dataIn } from '../../utils/contants';
import Tabs from '../../components/Tabs/Tabs';
import NoResults from '../../components/NoResults/NoResults';
import UpdateInstanceStatus from './components/UpdateInstanceStatus/UpdateInstanceStatus';

const ScheduleHistory = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const { user } = useAuth();
  const isRep = user.role === 'class-rep';

  const location = useLocation();
  const defaultTab = location.state?.tab || 'all';

  const { id } = useParams();
  const { data = [] } = useScheduleInstance(id);

  console.log(data);

  const [filterTab, setFilterTab] = useState(defaultTab);

  const dummyScheduleInstances =
    data && data.length > 0 ? [...data, ...dataIn] : dataIn;

  const scheduleInstances = dummyScheduleInstances.filter((ins) => {
    if (filterTab === 'all') return true;
    return filterTab === ins.classStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };
  };

  const getStatusConfig = (status) => {
    const configs = {
      // Pre-class / Planning
      scheduled: {
        color: '#2563eb', // Deep blue
        bgColor: '#dbeafe',
        icon: LuCalendarClock,
        text: 'Scheduled',
      },
      pending_approval: {
        color: '#9333ea', // Strong purple
        bgColor: '#ede9fe',
        icon: LuClock,
        text: 'Pending Approval',
      },
      rescheduled: {
        color: '#0ea5e9', // Sky blue
        bgColor: '#e0f2fe',
        icon: LuRotateCcw,
        text: 'Rescheduled',
      },
      postponed: {
        color: '#f97316', // Orange
        bgColor: '#fff7ed',
        icon: LuPause,
        text: 'Postponed',
      },

      // Live states
      holding: {
        color: '#22bac5',
        bgColor: '#dcfbfc',
        icon: LuCirclePlay,
        text: 'In Progress',
      },
      break: {
        color: '#eab308', // Yellow
        bgColor: '#fefce8',
        icon: LuPause,
        text: 'Break',
      },

      // Completion states
      held: {
        color: '#16a34a', // Darker green
        bgColor: '#ecfdf5',
        icon: LuCircleCheck,
        text: 'Completed',
      },
      partial: {
        color: '#facc15', // Golden yellow
        bgColor: '#fef9c3',
        icon: LuActivity,
        text: 'Partial Session',
      },
      cancelled: {
        color: '#dc2626', // Red
        bgColor: '#fee2e2',
        icon: LuCircleX,
        text: 'Cancelled',
      },
      missed: {
        color: '#b91c1c', // Darker red
        bgColor: '#fee2e2',
        icon: LuTriangleAlert,
        text: 'Missed',
      },

      // Special cases
      disrupted: {
        color: '#d97706', // Amber
        bgColor: '#fffbeb',
        icon: LuTriangleAlert,
        text: 'Disrupted',
      },
      makeup: {
        color: '#0284c7', // Blue-cyan
        bgColor: '#e0f2fe',
        icon: LuRotateCcw,
        text: 'Make-up Session',
      },
      offsite: {
        color: '#7c3aed', // Violet
        bgColor: '#f3e8ff',
        icon: LuMapPin,
        text: 'Offsite',
      },
    };

    return (
      configs[status] || {
        color: '#6b7280',
        bgColor: '#f9fafb',
        icon: LuCalendarClock,
        text: 'Unconfirmed',
      }
    );
  };

  const getDeliveryModeIcon = (mode) => {
    switch (mode) {
      case 'virtual':
        return LuMonitor;
      case 'hybrid':
        return LuWifi;
      case 'physical':
      default:
        return FaHome;
    }
  };

  const toggleExpanded = (instanceId) => {
    setExpandedCard(expandedCard === instanceId ? null : instanceId);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -2,
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)',
      transition: { duration: 0.2 },
    },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <header className={styles.header}>
            <h1 className={styles.title}>Class Schedule History</h1>
            <p className={styles.subtitle}>
              Stay organized — view, track, and manage all your upcoming and
              past class sessions.
            </p>
          </header>
        </motion.div>
        <motion.div className={styles.filterTab}>
          <Tabs
            tabs={CLASS_STATUS_TABS}
            activeTab={filterTab}
            onChange={setFilterTab}
          />
        </motion.div>

        {scheduleInstances.length === 0 ? (
          <NoResults
            title="No matching records"
            message="We couldn't find anything for your selected filters."
            icon={LuSearchX}
            buttonText="Reset Filters"
            onButtonClick={() => setFilterTab('all')}
          />
        ) : (
          <div className={styles.cardsGrid}>
            {scheduleInstances.map((instance, index) => {
              const dateInfo = formatDate(instance.classDate);
              const statusConfig = getStatusConfig(instance.classStatus);
              const StatusIcon = statusConfig.icon;
              const DeliveryIcon = getDeliveryModeIcon(instance.deliveryMode);
              const isExpanded = expandedCard === instance._id;

              return (
                <motion.div
                  key={instance._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  className={styles.card}>
                  {/* Card Header */}
                  <div
                    className={styles.cardHeader}
                    style={{
                      background: `linear-gradient(135deg, ${statusConfig.color} 0%, ${statusConfig.color}dd 100%)`,
                    }}>
                    <div className={styles.cardHeaderTop}>
                      <div>
                        <div className={styles.cardHeaderDate}>
                          {dateInfo.day}
                        </div>
                        <div className={styles.cardHeaderMonth}>
                          {dateInfo.month}
                        </div>
                      </div>

                      <div className={styles.cardStatus}>
                        <StatusIcon size={14} />
                        {statusConfig.text}
                      </div>
                    </div>

                    <div className={styles.cardWeekday}>{dateInfo.weekday}</div>

                    <div className={styles.cardTime}>
                      <LuClock size={14} />
                      {instance.updatedTime
                        ? `${instance.updatedTime.start} - ${instance.updatedTime.end}`
                        : dateInfo.time}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardBody}>
                    <div
                      className={styles.cardTitleRow}
                      onClick={() => toggleExpanded(instance._id)}>
                      <h3 className={styles.cardTitle}>
                        {instance.syllabusTopic || 'No topic specified'}
                      </h3>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}>
                        <LuChevronDown
                          size={20}
                          color="#64748b"
                        />
                      </motion.div>
                    </div>

                    {/* Quick Info */}
                    <div
                      className={styles.quickInfo}
                      onClick={() => toggleExpanded(instance._id)}>
                      <div className={styles.quickInfoItem}>
                        <DeliveryIcon size={16} />
                        {instance.deliveryMode}
                      </div>

                      {instance.updatedLocation && (
                        <div className={styles.quickInfoItem}>
                          <LuMapPin size={16} />
                          {instance.updatedLocation}
                        </div>
                      )}

                      {instance.attendanceSummary.totalPresent > 0 && (
                        <div className={styles.quickInfoItem}>
                          <FaUsers size={16} />
                          {instance.attendanceSummary.totalPresent} present
                        </div>
                      )}
                    </div>
                    {instance.classStatus === 'holding' &&
                      button.multiple({
                        icon: LuClipboardPlus,
                        element: 'Take Attendance',
                        name: 'default_button',
                      })}

                    {instance.classStatus === 'unconfirmed' ? (
                      isRep && (
                        <UpdateInstanceStatus
                          instance={instance}
                          onSuccess={(updatedInstance) => {
                            console.log('Status updated:', updatedInstance);
                          }}
                        />
                      )
                    ) : (
                      <LecturerMessage
                        messages={instance.lecturerMessages}
                        isRep={isRep}
                        onSave={(newMsg) => {
                          console.log('New message:', newMsg);
                        }}
                      />
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          style={{ overflow: 'hidden' }}>
                          <div className={styles.detailedInfo}>
                            <div className={styles.infoGrid}>
                              <div className={styles.infoBox}>
                                <div className={styles.infoBoxLabel}>
                                  Schedule ID
                                </div>
                                <div
                                  className={`${styles.infoBoxValue} ${styles.monospace}`}>
                                  {instance?.scheduleId?._id}
                                </div>
                              </div>
                            </div>
                            {/* Attendance Summary */}
                            {instance.attendanceSummary.totalPresent > 0 && (
                              <div className={styles.attendanceSummary}>
                                <div className={styles.attendanceSummaryHeader}>
                                  <FaUsers
                                    size={18}
                                    color="#3b82f6"
                                  />
                                  <span>Attendance Summary</span>
                                </div>
                                <div className={styles.attendanceStats}>
                                  <div className={styles.statItem}>
                                    <div className={styles.statPresent}>
                                      {instance.attendanceSummary.totalPresent}
                                    </div>
                                    <div className={styles.statLabel}>
                                      Present
                                    </div>
                                  </div>
                                  <div className={styles.statItem}>
                                    <div className={styles.statLate}>
                                      {instance.attendanceSummary.totalLate}
                                    </div>
                                    <div className={styles.statLabel}>Late</div>
                                  </div>
                                  <div className={styles.statItem}>
                                    <div className={styles.statAbsent}>
                                      {instance.attendanceSummary.totalAbsent}
                                    </div>
                                    <div className={styles.statLabel}>
                                      Absent
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Feedback */}
                            {instance.feedbackFromLecturer && (
                              <div className={styles.feedback}>
                                <div className={styles.feedbackHeader}>
                                  <LuMessageCircle
                                    size={16}
                                    color="#10b981"
                                  />
                                  <span>Lecturer Feedback</span>
                                </div>
                                <p>{instance.feedbackFromLecturer}</p>
                              </div>
                            )}
                            {/* Notes */}
                            {instance.notes && (
                              <div className={styles.notes}>
                                <div className={styles.notesHeader}>
                                  <LuFileText
                                    size={16}
                                    color="#f59e0b"
                                  />
                                  <span>Class Notes</span>
                                </div>
                                <p>{instance.notes}</p>
                              </div>
                            )}
                            {/* Reschedule Info */}
                            {instance.rescheduledToDate && (
                              <div className={styles.reschedule}>
                                <div className={styles.rescheduleHeader}>
                                  <LuCalendar
                                    size={16}
                                    color="#3b82f6"
                                  />
                                  <span>Rescheduled To</span>
                                </div>
                                <p>
                                  {
                                    formatDate(instance.rescheduledToDate)
                                      .weekday
                                  }
                                  ,{' '}
                                  {formatDate(instance.rescheduledToDate).month}{' '}
                                  {formatDate(instance.rescheduledToDate).day}{' '}
                                  at{' '}
                                  {formatDate(instance.rescheduledToDate).time}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleHistory;
