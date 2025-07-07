import React from 'react';
import styles from './PopupBox.module.css';

const PopupBox = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains(styles.backdrop)) {
      onClose?.();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}>
      <div className={styles.box}>
        <button
          className={styles.closeBtn}
          onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupBox;
