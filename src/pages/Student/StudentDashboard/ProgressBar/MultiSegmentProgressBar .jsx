import React from 'react';

const MultiSegmentProgressBar = ({
  present,
  absent,
  late,
  medical,
  excused,
}) => {
  const circumference = 314; // Circumference of the circle with r = 50
  const total = present + absent + late + medical + excused; // Ensure this equals 100%

  // Calculate the offset for each segment based on its percentage
  const getStrokeDasharray = (percent) => (percent / 100) * circumference;

  const presentOffset = getStrokeDasharray(present);
  const absentOffset = getStrokeDasharray(absent);
  const lateOffset = getStrokeDasharray(late);
  const medicalOffset = getStrokeDasharray(medical);
  const excusedOffset = getStrokeDasharray(excused);

  return (
    <div
      className="progress-container"
      style={{ width: 120, height: 120 }}>
      <svg
        className="progress-ring"
        width="120"
        height="120">
        <circle
          className="progress-bg"
          cx="60"
          cy="60"
          r="50"
        />
        {/* Present Segment */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r="50"
          style={{
            strokeDasharray: presentOffset, // Length of present segment
            strokeDashoffset: 0, // Starting position
            stroke: 'green', // Color for present
            strokeWidth: 10,
            fill: 'none',
          }}
        />
        {/* Absent Segment */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r="50"
          style={{
            strokeDasharray: absentOffset, // Length of absent segment
            strokeDashoffset: presentOffset, // Starting offset after present
            stroke: 'red', // Color for absent
            strokeWidth: 10,
            fill: 'none',
          }}
        />
        {/* Late Segment */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r="50"
          style={{
            strokeDasharray: lateOffset, // Length of late segment
            strokeDashoffset: presentOffset + absentOffset, // Starting offset after present and absent
            stroke: 'yellow', // Color for late
            strokeWidth: 10,
            fill: 'none',
          }}
        />
        {/* Medical Segment */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r="50"
          style={{
            strokeDasharray: medicalOffset, // Length of medical segment
            strokeDashoffset: presentOffset + absentOffset + lateOffset, // Starting offset
            stroke: 'blue', // Color for medical
            strokeWidth: 10,
            fill: 'none',
          }}
        />
        {/* Excused Segment */}
        <circle
          className="progress-bar"
          cx="60"
          cy="60"
          r="50"
          style={{
            strokeDasharray: excusedOffset, // Length of excused segment
            strokeDashoffset:
              presentOffset + absentOffset + lateOffset + medicalOffset, // Starting offset
            stroke: 'purple', // Color for excused
            strokeWidth: 10,
            fill: 'none',
          }}
        />
      </svg>
    </div>
  );
};

export default MultiSegmentProgressBar;
