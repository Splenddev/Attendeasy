import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = '',
  actionText = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Are you sure?</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button
            className={styles.cancel}
            onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.confirm}
            onClick={onConfirm}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
