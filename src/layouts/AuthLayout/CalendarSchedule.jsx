import React, { useState } from 'react';
import './CalendarSchedule.css';
import EmptyState from '../../components/EmptyState/EmptyState';
import button from '../../components/Button/Button';
import { FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarSchedule = ({ courses = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10)); // November 2025
  const [selectedDay, setSelectedDay] = useState(1);

  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const selectedDate = new Date(year, month, selectedDay);

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  /** Collect events for all courses on this date */
  const getEventsForDay = (date) => {
    const dayName = date.toLocaleString('default', { weekday: 'long' });

    return courses.flatMap((course) =>
      course.classDaysTimes
        .filter((c) => c.day === dayName)
        .map((c) => ({
          courseId: course._id,
          time: `${c.timing.startTime} - ${c.timing.endTime}`,
          title: course.courseTitle,
          code: course.courseCode,
          lecturer: course.lecturerName,
          venue: course.classroomVenue,
          type: course.classType,
          link: course.virtualLink,
        }))
    );
  };

  const events = getEventsForDay(selectedDate);

  /** Navigation */
  const handleMonthChange = (direction) => {
    const newMonth = new Date(year, month + direction);
    setCurrentDate(newMonth);
    setSelectedDay(1);
  };

  const handleDayChange = (direction) => {
    let newDay = selectedDay + direction;
    let newMonth = month;
    let newYear = year;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    if (newDay < 1) {
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      newDay = new Date(newYear, newMonth + 1, 0).getDate();
    } else if (newDay > daysInMonth) {
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

  /** 7-day strip */
  const renderDayStrip = () => {
    const dayOfWeek = selectedDate.getDay();
    const stripStartDate = new Date(year, month, selectedDay - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(stripStartDate);
      d.setDate(stripStartDate.getDate() + i);

      const dYear = d.getFullYear();
      const dMonth = d.getMonth();
      const dDate = d.getDate();

      const isCurrentMonth = dMonth === month && dYear === year;
      const isSelected =
        dYear === year && dMonth === month && dDate === selectedDay;

      days.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'active' : ''} ${
            !isCurrentMonth ? 'not-current-month' : ''
          }`}
          onClick={() => {
            setCurrentDate(new Date(dYear, dMonth));
            setSelectedDay(dDate);
          }}>
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
              className="event-item">
              <div className="event-time">{e.time}</div>
              <div className="event-title">
                {e.title} ({e.code})
              </div>
              <div className="event-meta">
                {e.lecturer} • {e.venue} • {e.type}
              </div>
              <div className="cta">
                {e.type === 'Virtual' && e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="default_button">
                    Join Class
                  </a>
                )}
                {button.multiple({
                  icon: FaHistory,
                  element: 'See History',
                  name: 'default_button',
                  func: () => navigate(`${e.courseId}/history`),
                })}
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="No classes scheduled"
            subtitle="Try adjusting selected day or check back later."
          />
        )}
      </div>
    </div>
  );
};

export default CalendarSchedule;
