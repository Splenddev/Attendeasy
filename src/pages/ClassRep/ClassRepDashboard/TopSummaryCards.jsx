import React from 'react';
import './TopSummaryCards.css';

const TopSummaryCards = ({ data }) => {
  const cards = [
    {
      label: 'Total Students',
      value: data.totalStudents,
      subLabel: 'Active in group',
      icon: '👥',
      color: '#4CAF50',
      tooltip: 'The number of students currently in your class group.',
    },
    {
      label: 'Classes Today',
      value: data.classesToday,
      subLabel: "Based on today's schedule",
      icon: '📅',
      color: '#2196F3',
      tooltip: 'Number of classes scheduled for today.',
    },
    {
      label: 'Pending Absence Pleas',
      value: data.pendingPleas,
      subLabel: 'Require your review',
      icon: '📩',
      color: '#FF9800',
      tooltip: 'Absence requests submitted by students awaiting approval.',
    },
    {
      label: 'Media for Approval',
      value: data.pendingMedia,
      subLabel: 'Uploaded by students',
      icon: '🎞️',
      color: '#E91E63',
      tooltip:
        'Student-submitted media (e.g., images, notes) waiting for your action.',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className="summary-card"
          style={{ borderLeft: `5px solid ${card.color}` }}
          title={card.tooltip}>
          <div
            className="card-icon-wrap"
            style={{ backgroundColor: card.color }}>
            <span className="card-icon">{card.icon}</span>
          </div>
          <div className="card-info">
            <p className="card-label">{card.label}</p>
            <p className="card-value">{card.value}</p>
            <p className="card-sublabel">{card.subLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSummaryCards;
