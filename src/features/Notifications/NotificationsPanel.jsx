import { MdClose } from 'react-icons/md';
import styles from './NotificationsPanel.module.css';
import { useNotification } from '../../context/NotificationContext';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ onClose }) => {
  const {
    notifications = [],
    updateAll,
    removeNotification,
    loading,
  } = useNotification();

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
          notifications.map((note, idx) => (
            <div
              className={styles.notification_item}
              key={note._id || idx}>
              <div className={styles.avatar}>
                <img
                  src={note.image || '/icons/info.png'}
                  alt="icon"
                />
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
                      <button className={styles.deny}>Deny</button>
                    )}
                    {note.actionApprove && (
                      <button className={styles.approve}>Approve</button>
                    )}
                  </div>
                )}
                <button
                  className={styles.delete}
                  onClick={() => removeNotification(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
