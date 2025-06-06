// NotificationPanel.jsx
import './NotificationsPanel.css';
import { MdClose } from 'react-icons/md';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ notifications = [], onClose }) => {
  return (
    <div className="notification-container">
      <div className="notification-header">
        <h3>
          Notification
          <MdClose
            onClick={() =>
              onClose((prev) => ({ ...prev, notifications: false }))
            }
          />
        </h3>
        <div className="tabs">
          <button className="tab active">View All</button>
          <button className="tab">Approves</button>
          <button className="tab">Archive</button>
        </div>
      </div>
      <div className="notification-list">
        {notifications.map((note, idx) => (
          <div
            key={idx}
            className="notification-item">
            <div className="avatar">
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
              {note.isNew && <span className="dot"></span>}
            </div>
            <div className="notification-content">
              <p>{note.message}</p>
              <span className="time">
                {note.dateAdded} at {note.timeAdded}
              </span>
              {note.userMedia && (
                <div className="file-box">
                  <span>{fileNameFromPath(note.userMedia)}</span>
                </div>
              )}
              {(note.actionApprove || note.actionDeny) && (
                <div className="buttons">
                  {note.actionDeny && <button className="deny">Deny</button>}
                  {note.actionApprove && (
                    <button className="approve">Approve</button>
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
