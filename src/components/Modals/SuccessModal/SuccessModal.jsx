import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCheckCircle } from 'react-icons/md';
import Confetti from 'react-confetti';
import successSoundFile from '../../../assets/sounds/success.mp3';
import './SuccessModal.css';
import { registerSuccessModal } from '../../../hooks/useSuccessModal';
import useDisableScroll from '../../../hooks/useDisableScroll';

const AUTO_CLOSE_DELAY = 4000; // ms

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

const SuccessModal = () => {
  const [state, setState] = useState({
    isOpen: false,
    success: null,
    initiator: null,
  });

  const { isOpen, success } = state;
  const { title, message, details } = success || {};

  useDisableScroll(isOpen);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    registerSuccessModal(setState);

    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const sound = new Audio(successSoundFile);
      sound.play().catch(() => {});

      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, isOpen: false }));
      }, AUTO_CLOSE_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={150}
          />
          <motion.div
            className="modal-overlay"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden">
            <motion.div
              className="success-modal pulse-animation"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit">
              <MdCheckCircle className="success-icon" />
              <h2 className="modal-title">{title || 'Success'}</h2>
              <p className="modal-message">
                {message || 'Operation completed successfully.'}
              </p>

              {details && (
                <div className="modal-details">
                  {Object.entries(details).map(([key, value]) => (
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
                onClick={handleClose}>
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
