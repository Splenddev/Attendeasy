import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max = 10, color = '#1976d2' }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
        title={`${Math.round(percentage)}%`}
      />
    </div>
  );
};

export default ProgressBar;
