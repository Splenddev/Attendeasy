import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdPerson } from 'react-icons/md';
import styles from './NotificationsPanel.module.css';
import { useNotification } from '../../context/NotificationContext';
import {
  approveJoinRequestService,
  rejectJoinRequestService,
} from '../../services/group.service';
import { toast } from 'react-toastify';
import button from '../../components/Button/Button';
import { FiRefreshCcw } from 'react-icons/fi';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ onClose, user }) => {
  const {
    notifications = [],
    updateAll,
    fetchNotifications,
    removeNotification,
    loading,
  } = useNotification();

  const handleAction = async (type, { studentId, reqType, noteId }) => {
    try {
      if (reqType === 'approveJoinRequest') {
        const res = await approveJoinRequestService(user.group, studentId);
        if (res.success) {
          toast.success('✅ Join request approved');
          removeNotification(noteId);
        }
      } else if (reqType === 'denyJoinRequest') {
        // Implement deny service call here
        const res = await rejectJoinRequestService(user.group, studentId);
        if (res.success) {
          toast.success('🚫 Join request denied');
          removeNotification(noteId);
        }
      } else {
        toast.info('ℹ️ Action completed');
      }
    } catch (error) {
      console.error(`Action "${reqType}" failed:`, error);
      toast.error(error.message || '⚠️ Action failed');
    }
  };

  return (
    <div className={styles.notification_container}>
      <div className={styles.notification_header}>
        <h3>
          Notification
          <MdClose
            onClick={() =>
              onClose((prev) => ({ ...prev, notifications: false }))
            }
          />
        </h3>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>View All</button>
          <button
            className={styles.tab}
            onClick={updateAll}>
            Mark All Read
          </button>
        </div>
      </div>
      <div className={styles.notification_list}>
        {loading ? (
          <p className={styles.empty}>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <div className={styles.empty_wrap}>
            <p className={styles.empty}>No notifications found.</p>
            {button.multiple({
              icon: FiRefreshCcw,
              element: 'Retry',
              func: () => fetchNotifications(),
            })}
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((note, idx) => (
              <motion.div
                key={note._id || idx}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={styles.notification_item}>
                <div className={styles.avatar}>
                  {note.image ? (
                    <img
                      src={note.image}
                      alt="icon"
                    />
                  ) : (
                    <MdPerson size={20} />
                  )}
                  {note.isNew && <span className={styles.dot}></span>}
                </div>
                <div className={styles.notification_content}>
                  <p>{note.message}</p>
                  <span className={styles.time}>
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  {note.userMedia && (
                    <div className={styles.file_box}>
                      <span>{fileNameFromPath(note.userMedia)}</span>
                    </div>
                  )}
                  {(note.actionApprove || note.actionDeny) && (
                    <div className={styles.buttons}>
                      {note.actionDeny && (
                        <button
                          onClick={() =>
                            handleAction('deny', {
                              studentId: note.from,
                              reqType: note.actionDeny,
                              noteId: note._id,
                            })
                          }
                          className={styles.deny}>
                          Deny
                        </button>
                      )}
                      {note.actionApprove && (
                        <button
                          onClick={() =>
                            handleAction('approve', {
                              studentId: note.from,
                              reqType: note.actionApprove,
                              noteId: note._id,
                            })
                          }
                          className={styles.approve}>
                          Approve
                        </button>
                      )}
                    </div>
                  )}
                  <button
                    className={styles.delete}
                    onClick={() => removeNotification(note._id)}>
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
