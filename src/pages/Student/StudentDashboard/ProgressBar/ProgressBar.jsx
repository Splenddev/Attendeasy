import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBar.css';

const ProgressBar = ({ percent }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // Animate from 0 to percent
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(percent / 60)); // smooth steps
    const interval = setInterval(() => {
      current += step;
      if (current >= percent) {
        current = percent;
        clearInterval(interval);
      }
      setAnimatedPercent(current);
    }, 15); // animation speed
    return () => clearInterval(interval);
  }, [percent]);

  const getStatus = (percent) => {
    if (percent < 40) return { text: 'POOR', color: 'red' };
    if (percent >= 40 && percent < 70)
      return { text: 'AVERAGE', color: 'orange' };
    return { text: 'GOOD', color: 'green' };
  };

  const { text: statusText, color: statusColor } = getStatus(percent);

  return (
    <div className="progress-container">
      <div
        className="status"
        style={{ color: statusColor, marginTop: 5 }}>
        <p>{`${percent}%`}</p>
        <span>marked</span>
        {statusText}
      </div>
      <div className="test"></div>
      <div style={{ width: 130, height: 130 }}>
        <CircularProgressbar
          value={animatedPercent}
          strokeWidth={9}
          // text={}
          styles={buildStyles({
            pathColor: statusColor,
            textColor: '#333',
            trailColor: '#e0e5e9',
            textSize: '16px',
          })}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
