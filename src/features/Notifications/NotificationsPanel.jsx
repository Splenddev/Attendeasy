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
import {
  FiLoader,
  FiMoreVertical,
  FiRefreshCcw,
  FiRefreshCw,
  FiTrash2,
} from 'react-icons/fi';
import useDisableScroll from '../../hooks/useDisableScroll';
import { renderMediaTypeIcon } from '../IconRenderer/IconRenderer';
import { LuCheckCheck, LuTrash } from 'react-icons/lu';
import { useState } from 'react';

const fileNameFromPath = (path) => path.split('/').pop();

const NotificationsPanel = ({ onClose, user, openState }) => {
  const {
    notifications = [],
    loading = {},
    fetchNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    removeNotification,
    removeAllNotifications,
  } = useNotification();

  const hasUnread = notifications.some((n) => n.unread);

  const { fetch, markOne, markAll, deleteOne, deleteAll } = loading;

  const [openNoteId, setOpenNoteId] = useState(null);

  useDisableScroll(openState);

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

  const toggleOptions = (noteId) => {
    setOpenNoteId((prevId) => (prevId === noteId ? null : noteId));
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
          {button.multiple({
            icon: markAll ? FiLoader : LuCheckCheck,
            name: styles.tab + ' ' + styles.markAll,
            func: () => markAllNotificationsAsRead(),
            element: `Mark All ${hasUnread ? 'Read' : 'Unread'}`,
            loader: markAll,
          })}
          {button.multiple({
            icon: deleteAll ? FiLoader : FiTrash2,
            name: styles.tab + ' ' + styles.delete,
            func: () => removeAllNotifications(),
            element: 'Delete All',
            loader: deleteAll,
          })}
          {button.multiple({
            icon: FiRefreshCw,
            name: styles.tab + ' ' + styles.reload,
            func: () => fetchNotifications(),
            element: 'Reload',
            loader: fetch,
          })}
        </div>
      </div>
      <div className={styles.notification_list}>
        {fetch ? (
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
            {notifications.map((note, idx) => {
              const { icon } = renderMediaTypeIcon(note.type, note.relatedType);

              return (
                <motion.div
                  key={note._id || idx}
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`${styles.notification_item} ${
                    note.unread && styles.dot
                  }`}>
                  <div className={styles.avatar}>
                    {note.image ? (
                      <img
                        src={note.image}
                        alt="icon"
                      />
                    ) : (
                      <>{icon}</>
                    )}
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
                  </div>
                  <div className={styles.more}>
                    <FiMoreVertical onClick={() => toggleOptions(note._id)} />
                    {openNoteId === note._id && (
                      <>
                        <div className={styles.pointer}></div>
                        <ul className={styles.more_option}>
                          <li onClick={() => markNotificationAsRead(note._id)}>
                            {markOne ? (
                              <FiLoader className="spin" />
                            ) : (
                              <LuCheckCheck />
                            )}
                            Mark as {note.unread ? 'Read' : 'Unread'}
                          </li>
                          <li onClick={() => removeNotification(note._id)}>
                            {deleteOne ? (
                              <FiLoader className="spin" />
                            ) : (
                              <LuTrash />
                            )}
                            Delete
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
