import React, { useState } from 'react';
import './CalendarSchedule.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarSchedule = ({ scheduleData = {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10)); // November 2024
  const [selectedDay, setSelectedDay] = useState(1);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const currentKey = formatDate(year, month, selectedDay);
  const events = scheduleData[currentKey] || [];

  const handleMonthChange = (direction) => {
    const newMonth = new Date(year, month + direction);
    setCurrentDate(newMonth);
    setSelectedDay(1);
  };

  const handleDayChange = (direction) => {
    let newDay = selectedDay + direction;
    let newMonth = month;
    let newYear = year;

    // Days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    if (newDay < 1) {
      // Move to previous month
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      const daysInPrevMonth = new Date(newYear, newMonth + 1, 0).getDate();
      newDay = daysInPrevMonth;
    } else if (newDay > daysInMonth) {
      // Move to next month
      newDay = 1;
      newMonth += 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
    }

    setCurrentDate(new Date(newYear, newMonth));
    setSelectedDay(newDay);
  };

  // Renders the 7-day horizontal strip aligned to the week of the selected day
  const renderDayStrip = () => {
    const selectedDate = new Date(year, month, selectedDay);
    const dayOfWeek = selectedDate.getDay(); // 0=Sun ... 6=Sat

    // Start date is Sunday of the selected day’s week
    const stripStartDate = new Date(year, month, selectedDay - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(stripStartDate);
      d.setDate(stripStartDate.getDate() + i);

      const dYear = d.getFullYear();
      const dMonth = d.getMonth();
      const dDate = d.getDate();

      // Check if day is in current month
      const isCurrentMonth = dMonth === month && dYear === year;
      const isSelected =
        dYear === year && dMonth === month && dDate === selectedDay;

      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'active' : ''} ${
            !isCurrentMonth ? 'not-current-month' : ''
          }`}
          onClick={() => setSelectedDay(dDate)}
          title={`${daysOfWeek[d.getDay()]}, ${formatDate(
            dYear,
            dMonth,
            dDate
          )}`}>
          <div className="day-label">{daysOfWeek[d.getDay()]}</div>
          <div className="day-number">{dDate}</div>
        </div>
      );
    }

    return <div className="calendar-strip">{days}</div>;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&#10094; Month</button>
        <span className="month-label">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button onClick={() => handleMonthChange(1)}>Month &#10095;</button>
      </div>

      <div className="day-navigation">
        <button onClick={() => handleDayChange(-1)}>&#10094; Day</button>
        <span className="selected-day-label">
          {formatDate(year, month, selectedDay)}
        </span>
        <button onClick={() => handleDayChange(1)}>Day &#10095;</button>
      </div>

      {renderDayStrip()}

      <div className="event-list">
        {events.length > 0 ? (
          events.map((e, idx) => (
            <div
              key={idx}
              className="event-item"
              style={{ borderLeftColor: e.color }}>
              <div className="event-time">{e.time}</div>
              <div className="event-grade">{e.grade}</div>
              <div className="event-title">{e.title}</div>
            </div>
          ))
        ) : (
          <div className="no-events">No events scheduled.</div>
        )}
      </div>
    </div>
  );
};

export default CalendarSchedule;
