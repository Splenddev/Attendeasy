import { MdClose } from 'react-icons/md';
import styles from './NotificationsPanel.module.css';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ notifications = [], onClose }) => {
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
          <button className={styles.tab}>Approves</button>
          <button className={styles.tab}>Archive</button>
        </div>
      </div>
      <div className={styles.notification_list}>
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className={styles.notification_item}>
            <div className={styles.avatar}>
              <img
                src={note.image
                  .replace(
                    '/avatars/student_anna.jpg',
                    'https://randomuser.me/api/portraits/women/1.jpg'
                  )
                  .replace(
                    '/avatars/student_musa.jpg',
                    'https://randomuser.me/api/portraits/men/2.jpg'
                  )
                  .replace(
                    '/avatars/student_lola.jpg',
                    'https://randomuser.me/api/portraits/women/3.jpg'
                  )
                  .replace(
                    '/avatars/student_emeka.jpg',
                    'https://randomuser.me/api/portraits/men/4.jpg'
                  )
                  .replace(
                    '/avatars/student_ife.jpg',
                    'https://randomuser.me/api/portraits/women/5.jpg'
                  )
                  .replace(
                    '/icons/document.png',
                    'https://cdn-icons-png.flaticon.com/512/337/337946.png'
                  )
                  .replace(
                    '/icons/info.png',
                    'https://cdn-icons-png.flaticon.com/512/159/159469.png'
                  )
                  .replace(
                    '/icons/calendar.png',
                    'https://cdn-icons-png.flaticon.com/512/747/747310.png'
                  )
                  .replace(
                    '/icons/warning.png',
                    'https://cdn-icons-png.flaticon.com/512/564/564619.png'
                  )
                  .replace(
                    '/icons/assignment.png',
                    'https://cdn-icons-png.flaticon.com/512/3022/3022308.png'
                  )
                  .replace(
                    '/icons/image.png',
                    'https://cdn-icons-png.flaticon.com/512/337/337948.png'
                  )
                  .replace(
                    '/icons/pdf-icon.png',
                    'https://cdn-icons-png.flaticon.com/512/337/337946.png'
                  )}
                alt="icon"
              />
              {note.isNew && <span className={styles.dot}></span>}
            </div>
            <div className={styles.notification_content}>
              <p>{note.message}</p>
              <span className={styles.time}>
                {note.dateAdded} at {note.timeAdded}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationsPanel;
