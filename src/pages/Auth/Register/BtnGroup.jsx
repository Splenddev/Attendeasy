import React from 'react';
import button from '../../../components/Button/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
const BtnGroup = ({
  onNext,
  onBack,
  step,
  nextText = 'next',
  backText = 'back',
  type = 'submit',
}) => {
  return (
    <div className="button-group-wrapper">
      <div className="button-group">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}>
          {step > 0 &&
            button.multiple({
              name: 'btn secondary',
              func: onBack,
              icon: FaArrowLeft,
              element: backText,
            })}
        </motion.div>
        {onNext && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}>
            {button.multiple({
              name: 'btn primary reverse',
              func: onNext,
              icon: FaArrowRight,
              element: nextText,
              type,
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BtnGroup;
