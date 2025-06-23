import React from 'react';
import styles from './ConfirmModal.module.css';
import Spinner from '../../Loader/Spinner/Spinner';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = '',
  actionText = '',
  loader,
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
            {loader ? <Spinner scale="0.8" /> : actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
