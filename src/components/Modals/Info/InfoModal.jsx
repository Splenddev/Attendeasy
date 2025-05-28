import './InfoModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import button from '../../Button/Button';
import { MdThumbUp } from 'react-icons/md';

const InfoModal = ({ visible, modalId, onClose, infoModalContent }) => {
  const modalData = infoModalContent.find((item) => item.id === modalId);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && modalData && (
        <motion.div
          className="modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.1 } }}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <h2>{modalData.title}</h2>
            <ul className="info-list">
              {modalData.points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <li
                    key={index}
                    className="info-point">
                    {Icon && (
                      <span className="icon">
                        <Icon />
                      </span>
                    )}
                    <span className="text">
                      {point.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      <hr />
                    </span>
                  </li>
                );
              })}
            </ul>

            <div
              className="modal-close-btn"
              onClick={onClose}>
              {button.multiple({
                icon: MdThumbUp,
                func: onClose,
                label: 'close-info-modal',
                element: 'OK',
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
