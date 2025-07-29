import React from 'react';
import './TodayAttendanceCard.css'; // or use CSS module

const TodayAttendanceCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-badge shimmer"></div>
      </div>

      <div className="skeleton-sub shimmer"></div>
      <div className="skeleton-location shimmer"></div>

      <div className="skeleton-timing-row">
        <div className="skeleton-time-block shimmer"></div>
        <div className="skeleton-time-block shimmer"></div>
      </div>
      <div className="skeleton-timing-row">
        <div className="skeleton-time-block shimmer"></div>
        <div className="skeleton-time-block shimmer"></div>
      </div>

      <div className="skeleton-status shimmer"></div>
      <div className="skeleton-countdown shimmer"></div>
      <div className="skeleton-countdown shimmer"></div>

      <div className="skeleton-button shimmer"></div>
    </div>
  );
};

export default TodayAttendanceCard;
