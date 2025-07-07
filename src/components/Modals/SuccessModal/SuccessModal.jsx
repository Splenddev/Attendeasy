import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCheckCircle } from 'react-icons/md';
import './SuccessModal.css';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { scale: 0.8, opacity: 0, y: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.3, duration: 0.5 },
  },
  exit: { scale: 0.8, opacity: 0, y: 50 },
};

const SuccessModal = ({ isOpen, data, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden">
          <motion.div
            className="success-modal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit">
            <MdCheckCircle className="success-icon" />

            <h2 className="modal-title">Success</h2>

            <p className="modal-message">
              {data?.message || 'Operation successful.'}
            </p>

            {data?.details && (
              <div className="modal-details">
                {Object.entries(data.details).map(([key, value]) => (
                  <div
                    className="detail-row"
                    key={key}>
                    <strong>{key}:</strong> <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn-close"
              onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
