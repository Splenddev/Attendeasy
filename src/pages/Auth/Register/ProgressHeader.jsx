import React from 'react';

const ProgressHeader = ({ currentStep, steps }) => (
  <div className="progress-header">
    {steps.map((label, idx) => (
      <div
        key={label}
        className={`step ${currentStep === idx ? 'active' : ''} ${
          currentStep > idx ? 'done' : ''
        }`}>
        <div className="circle">{idx + 1}</div>
        <span>{label}</span>
      </div>
    ))}
  </div>
);

export default ProgressHeader;
