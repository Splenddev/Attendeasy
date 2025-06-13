import React from 'react';
import {
  FaClock,
  FaGraduationCap,
  FaUserCheck,
  FaUserTimes,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

const attendanceData = {
  today: {
    total: 633,
    present: 533,
    absent: 60,
    late: 40,
  },
  yesterday: {
    total: 620,
    present: 510,
    absent: 70,
    late: 40,
  },
};

const AttendanceSection = ({ navMenu, setNavMenu }) => {
  const data = attendanceData[navMenu];
  const presentPct = ((data.present / data.total) * 100).toFixed(1);
  const absentPct = ((data.absent / data.total) * 100).toFixed(1);
  const latePct = ((data.late / data.total) * 100).toFixed(1);

  const prevData = attendanceData[navMenu === 'today' ? 'yesterday' : 'today'];

  const getTrendIcon = (curr, prev) => {
    if (curr > prev) return <FaArrowUp color="green" />;
    if (curr < prev) return <FaArrowDown color="red" />;
    return null;
  };

  return (
    <div className="attendance-section">
      <div
        className="tabs"
        role="tablist">
        {['today', 'yesterday'].map((day) => (
          <button
            key={day}
            role="tab"
            aria-selected={navMenu === day}
            className={`tab ${navMenu === day ? 'active' : ''}`}
            onClick={() => setNavMenu(day)}>
            {day.charAt(0).toUpperCase() + day.slice(1)}&apos;s Attendance
          </button>
        ))}
      </div>

      <div className="attendance-cards">
        {[
          {
            icon: FaGraduationCap,
            label: 'Total Students',
            value: data.total,
            color: '#607d8b',
            pct: null,
            trend: null,
          },
          {
            icon: FaUserCheck,
            label: 'Present',
            value: data.present,
            color: '#4caf50',
            pct: presentPct,
            trend: getTrendIcon(data.present, prevData.present),
          },
          {
            icon: FaUserTimes,
            label: 'Absent',
            value: data.absent,
            color: '#f44336',
            pct: absentPct,
            trend: getTrendIcon(data.absent, prevData.absent),
          },
          {
            icon: FaClock,
            label: 'Late',
            value: data.late,
            color: '#ff9800',
            pct: latePct,
            trend: getTrendIcon(data.late, prevData.late),
          },
        ].map(({ icon, label, value, color, pct, trend }) => {
          const Icon = icon;
          return (
            <div
              key={label}
              className="attendance-card"
              style={{ borderTop: `4px solid ${color}` }}
              tabIndex={0}
              aria-label={`${label}: ${value} (${pct ? pct + '%' : ''})`}>
              <div
                className="icon-wrapper"
                style={{ backgroundColor: color + '33' /* translucent */ }}>
                <Icon color={color} />
              </div>
              <div className="card-content">
                <h4 className="value">
                  {value}
                  <span className="trend-icon">{trend}</span>
                </h4>
                {pct && (
                  <div className="pct-trend">
                    <span className="percentage">{pct}%</span>
                  </div>
                )}
                <p className="label">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceSection;
