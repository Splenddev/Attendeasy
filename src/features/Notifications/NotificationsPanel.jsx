import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdPerson } from 'react-icons/md';
import styles from './NotificationsPanel.module.css';
import { useNotification } from '../../context/NotificationContext';
import { approveJoinRequestService } from '../../services/group.service';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ onClose, user }) => {
  const {
    notifications = [],
    updateAll,
    removeNotification,
    loading,
    fetchNotifications,
  } = useNotification();

  useEffect(() => {
    fetchNotifications();
  }, [notifications]);

  const handleDeny = async (reqType) => {};
  const handleAccept = async (studentId, reqType) => {
    if (reqType !== 'approveJoinRequest') return toast.info('Success');

    try {
      const res = await approveJoinRequestService(user.group, studentId);
      if (res.success) toast.success('Accepted');
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Error!');
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
          <p className={styles.empty}>No notifications found.</p>
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
                          onClick={handleDeny}
                          className={styles.deny}>
                          Deny
                        </button>
                      )}
                      {note.actionApprove && (
                        <button
                          onClick={() =>
                            handleAccept(note.from, note.actionApprove)
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
