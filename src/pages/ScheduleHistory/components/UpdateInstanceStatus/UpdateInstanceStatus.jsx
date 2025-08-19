import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextArea from '../../../../components/TextArea/TextArea';
import styles from './UpdateInstanceStatus.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useScheduleInstance } from '../../../../hooks/useScheduleInstance';

const STATUS_OPTIONS = [
  'unconfirmed',
  'pending_approval',
  'rescheduled',
  'postponed',
  'holding',
  'cancelled',
  'makeup',
  'offsite',
];

const formatStatusLabel = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');

// Animation variants
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const fieldsetVariants = {
  initial: { opacity: 0, height: 0, marginBottom: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    marginBottom: 16,
    transition: {
      height: { duration: 0.3, ease: 'easeOut' },
      opacity: { duration: 0.2, delay: 0.1 },
      marginBottom: { duration: 0.3, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: {
      opacity: { duration: 0.1 },
      height: { duration: 0.2, delay: 0.1, ease: 'easeIn' },
      marginBottom: { duration: 0.2, delay: 0.1, ease: 'easeIn' },
    },
  },
};

const messageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function UpdateInstanceStatus({ instance, onSuccess }) {
  const [status, setStatus] = useState(instance.classStatus || 'unconfirmed');
  const [newDate, setNewDate] = useState(
    instance.rescheduledToDate
      ? new Date(instance.rescheduledToDate).toISOString().substring(0, 10)
      : ''
  );
  const [startTime, setStartTime] = useState(instance.updatedTime?.start || '');
  const [endTime, setEndTime] = useState(instance.updatedTime?.end || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const {
    update: updateStatus,
    loading,
    error: hookError,
  } = useScheduleInstance(instance._id);

  const showRescheduleFields = ['rescheduled', 'postponed', 'makeup'].includes(
    status
  );
  const showCancellationReason = status === 'cancelled';
  const showPendingApprovalNote = status === 'pending_approval';
  const showHoldingReason = status === 'holding';
  const showIncidentNotes = ['offsite'].includes(status);

  const isValidDate = !showRescheduleFields || newDate !== '';
  const isValidTime =
    !showRescheduleFields || !startTime || !endTime || startTime <= endTime;
  const isValidMessage =
    !showCancellationReason && !showHoldingReason && !showIncidentNotes
      ? true
      : message.trim() !== '';

  const handleReset = () => {
    setStatus(instance.classStatus || 'unconfirmed');
    setNewDate(
      instance.rescheduledToDate
        ? new Date(instance.rescheduledToDate).toISOString().substring(0, 10)
        : ''
    );
    setStartTime(instance.updatedTime?.start || '');
    setEndTime(instance.updatedTime?.end || '');
    setMessage('');
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!isValidDate) return setError('Please select a valid new date.');
    if (!isValidTime)
      return setError('Start time must be before or equal to end time.');
    if (!isValidMessage) return setError('Please provide a message.');

    try {
      const updatedInstance = await updateStatus({
        id: instance._id,
        classStatus: status,
        rescheduledToDate: showRescheduleFields ? newDate : null,
        updatedTime: showRescheduleFields
          ? { start: startTime || null, end: endTime || null }
          : null,
        lecturerMessage:
          showCancellationReason || showHoldingReason || showIncidentNotes
            ? message
            : null,
      });

      onSuccess?.(updatedInstance);
      setMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  const isDisabled = loading || !isValidDate || !isValidTime || !isValidMessage;

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.b
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}>
        Update Status for {instance.scheduleId?.courseTitle || 'Schedule'}
      </motion.b>

      <motion.div
        className={styles.currentInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(instance.classDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Current Status:</strong>{' '}
          {formatStatusLabel(instance.classStatus)}
        </p>
      </motion.div>

      <motion.div
        className={styles.field}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}>
        <label
          htmlFor="status-select"
          className={styles.label}>
          Select New Status:
        </label>
        <motion.select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
          className={styles.select}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}>
          {STATUS_OPTIONS.map((opt) => (
            <option
              key={opt}
              value={opt}>
              {formatStatusLabel(opt)}
            </option>
          ))}
        </motion.select>
      </motion.div>

      <AnimatePresence mode="wait">
        {showPendingApprovalNote && (
          <motion.div
            className={styles.infoBox}
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="pending-note">
            <FaExclamationTriangle className={styles.infoIcon} />
            <span>
              The selected status indicates the class might still take place, as
              we are awaiting the lecturer's confirmation. You may update
              details freely.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showRescheduleFields && (
          <motion.fieldset
            className={styles.fieldset}
            variants={fieldsetVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="reschedule-fields">
            <legend className={styles.legend}>
              {formatStatusLabel(status)} Details
            </legend>

            <div className={styles.field}>
              <label
                htmlFor="new-date"
                className={styles.label}>
                New Date:
              </label>
              <input
                type="date"
                id="new-date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                disabled={loading}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor="start-time"
                className={styles.label}>
                Start Time (optional):
              </label>
              <input
                type="time"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={loading}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor="end-time"
                className={styles.label}>
                End Time (optional):
              </label>
              <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={loading}
                className={styles.input}
              />
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(showCancellationReason || showHoldingReason || showIncidentNotes) && (
          <motion.div
            className={styles.messageField}
            variants={fieldsetVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="message-field">
            <label
              htmlFor="message"
              className={styles.label}>
              {showCancellationReason
                ? 'Cancellation Reason:'
                : showHoldingReason
                ? 'Reason for Holding:'
                : 'Notes:'}
            </label>
            <TextArea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                showCancellationReason
                  ? 'Please provide a reason for cancellation.'
                  : showHoldingReason
                  ? 'Add any relevant notes about the class being held.'
                  : 'Add notes about this class instance.'
              }
              maxLength={500}
              showCounter={true}
              disabled={loading}
              className={styles.textarea}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(error || hookError) && (
          <motion.p
            role="alert"
            className={styles.error}
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="error-message">
            {error || hookError}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.buttonGroup}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}>
        <motion.button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`${styles.button} ${styles.submitButton} ${
            isDisabled ? styles.disabled : ''
          }`}
          variants={buttonVariants}
          whileHover={!isDisabled ? 'hover' : undefined}
          whileTap={!isDisabled ? 'tap' : undefined}>
          {loading ? 'Updating...' : 'Update Status'}
        </motion.button>

        <motion.button
          onClick={handleReset}
          type="button"
          disabled={loading}
          className={`${styles.button} ${styles.resetButton} ${
            loading ? styles.disabled : ''
          }`}
          variants={buttonVariants}
          whileHover={!loading ? 'hover' : undefined}
          whileTap={!loading ? 'tap' : undefined}>
          Reset
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
