import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MultiSegmentProgressBar = ({
  present,
  absent,
  late,
  medical,
  excused,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {/* Present Segment */}
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={present}
          text={`${present}%`}
          styles={buildStyles({
            pathColor: '#32CD32', // Green color for present
            textColor: '#333',
            trailColor: '#e0e5e9',
          })}
        />
      </div>

      {/* Absent Segment */}
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={absent}
          text={`${absent}%`}
          styles={buildStyles({
            pathColor: '#FF6347', // Red color for absent
            textColor: '#333',
            trailColor: '#e0e5e9',
          })}
        />
      </div>

      {/* Late Segment */}
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={late}
          text={`${late}%`}
          styles={buildStyles({
            pathColor: '#FFD700', // Yellow for late
            textColor: '#333',
            trailColor: '#e0e5e9',
          })}
        />
      </div>

      {/* Medical Segment */}
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={medical}
          text={`${medical}%`}
          styles={buildStyles({
            pathColor: '#1E90FF', // Blue for medical
            textColor: '#333',
            trailColor: '#e0e5e9',
          })}
        />
      </div>

      {/* Excused Segment */}
      <div style={{ width: 120, height: 120 }}>
        <CircularProgressbar
          value={excused}
          text={`${excused}%`}
          styles={buildStyles({
            pathColor: '#800080', // Purple for excused
            textColor: '#333',
            trailColor: '#e0e5e9',
          })}
        />
      </div>
    </div>
  );
};

export default MultiSegmentProgressBar;
