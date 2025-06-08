import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const ProgressHeader = ({ currentStep, steps }) => (
  <div className="progress-header">
    {steps.map((label, idx) => {
      const isActive = currentStep === idx;
      const isDone = currentStep > idx;
      return (
        <motion.div
          key={label}
          className={`step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}>
          <div className="circle">{isDone ? <FaCheck /> : idx + 1}</div>
          <span className="label">{label}</span>
        </motion.div>
      );
    })}
  </div>
);

export default ProgressHeader;
