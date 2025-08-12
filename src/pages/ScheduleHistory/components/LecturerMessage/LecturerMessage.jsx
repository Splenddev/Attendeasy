import { useState } from 'react';
import styles from './LecturerMessage.module.css';
import TextArea from '../../../../components/TextArea/TextArea';
import button from '../../../../components/Button/Button';
import { FiEdit3, FiPlus } from 'react-icons/fi';

export default function LecturerMessage({ messages = [], isRep, onSave }) {
  const [isExpanded, setIsExpanded] = useState({});
  const [isEditing, setIsEditing] = useState(null); // index or 'new'
  const [draft, setDraft] = useState('');

  const handleSave = () => {
    if (!draft.trim()) return;

    let updatedMessages = [...messages];

    if (isEditing === 'new') {
      updatedMessages.push({
        id: Date.now(),
        text: draft.trim(),
        createdAt: new Date().toISOString(),
        author: 'Lecturer',
        type: 'note',
      });
    } else {
      updatedMessages[isEditing] = {
        ...updatedMessages[isEditing],
        text: draft.trim(),
      };
    }

    onSave?.(updatedMessages);
    setIsEditing(null);
    setDraft('');
  };

  const startEdit = (index) => {
    setIsEditing(index);
    setDraft(messages[index]?.text || '');
  };

  const startNew = () => {
    setIsEditing('new');
    setDraft('');
  };

  if (isEditing !== null) {
    return (
      <div className={styles.lecturerMessage}>
        <TextArea
          name="lecturerMessage"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Enter a message for students..."
          maxLength={500}
          className={styles.input}
          showCounter={true}
        />
        <div className={styles.actions}>
          <button
            onClick={handleSave}
            className={styles.saveBtn}>
            Save
          </button>
          <button
            onClick={() => setIsEditing(null)}
            className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.lecturerMessage}>
      {messages.length > 0 ? (
        <>
          <ul className={styles.messageList}>
            {messages.map((msg, index) => {
              const content = msg.text || '';
              const isTruncated = content.length > 80 && !isExpanded[index];
              const displayMessage = isTruncated
                ? `${content.substring(0, 80)}...`
                : content;

              return (
                <li
                  key={msg.id || index}
                  className={styles.messageItem}>
                  <p>
                    <span>{displayMessage}</span>
                    {isTruncated && (
                      <button
                        className={styles.expandBtn}
                        onClick={() =>
                          setIsExpanded({ ...isExpanded, [index]: true })
                        }
                        aria-label="View full lecturer message">
                        Read full
                      </button>
                    )}
                    {!isTruncated && isExpanded[index] && (
                      <button
                        className={styles.expandBtn}
                        onClick={() =>
                          setIsExpanded({ ...isExpanded, [index]: false })
                        }>
                        Show less
                      </button>
                    )}
                  </p>
                  <small className={styles.meta}>
                    {msg.author && <span>By {msg.author}</span>}
                    {msg.createdAt && (
                      <span> · {new Date(msg.createdAt).toLocaleString()}</span>
                    )}
                    {msg.type && <span> · {msg.type}</span>}
                  </small>

                  {isRep &&
                    button.multiple({
                      icon: FiEdit3,
                      element: 'Edit',
                      label: 'Edit this lecturer message',
                      name: styles.editBtn,
                      func: () => startEdit(index),
                    })}
                </li>
              );
            })}
          </ul>
          {isRep &&
            button.multiple({
              icon: FiPlus,
              element: 'Add message',
              label: 'Add another lecturer message',
              name: styles.addBtn,
              func: startNew,
            })}
        </>
      ) : isRep ? (
        <div>
          <p className={styles.placeholder}>
            No messages yet. Use this space to give students important details,
            reminders, or follow-ups.
          </p>
          <button
            className={styles.addBtn}
            onClick={startNew}
            aria-label="Add a new lecturer message">
            Add a message
          </button>
        </div>
      ) : (
        <p className={styles.placeholder}>
          The Reps has not posted any messages for this class.
        </p>
      )}
    </div>
  );
}
