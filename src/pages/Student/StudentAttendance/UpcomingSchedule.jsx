import { useState, useEffect } from 'react';

const reminderOptions = [
  { label: 'None', value: 'none' },
  { label: '10 minutes before', value: 10 },
  { label: '30 minutes before', value: 30 },
  { label: '1 hour before', value: 60 },
];

const UpcomingSchedule = ({ schedules }) => {
  // Load saved reminders from localStorage or default empty object
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('reminders');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Function to schedule notification
  const scheduleNotification = (courseTitle, minutesBefore, startTime) => {
    if (!('Notification' in window)) return;

    const notify = () => {
      const classTime = new Date();
      const [hours, minutes] = startTime.split(':').map(Number);
      classTime.setHours(hours, minutes, 0, 0);

      const notifyTime = new Date(classTime.getTime() - minutesBefore * 60000);
      const delay = notifyTime.getTime() - Date.now();

      if (delay > 0) {
        setTimeout(() => {
          new Notification(
            `Reminder: ${courseTitle} starts in ${minutesBefore} minutes`
          );
        }, delay);
      }
    };

    if (Notification.permission === 'granted') {
      notify();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') notify();
      });
    }
  };

  const handleReminderChange = (scheduleId, value, courseTitle, startTime) => {
    setReminders((prev) => ({
      ...prev,
      [scheduleId]: value,
    }));

    if (value !== 'none') {
      scheduleNotification(courseTitle, Number(value), startTime);
    }
  };

  return (
    <section className="upcoming-schedule">
      <h4 className="upcoming-schedule__title">Upcoming Classes</h4>

      {schedules.length === 0 ? (
        <p className="upcoming-schedule__empty">
          No classes scheduled for today.
        </p>
      ) : (
        schedules.map(
          ({ id, courseCode, day, timing, classroomVenue, lecturerName }) => (
            <article
              key={id}
              className="schedule-item">
              <header className="schedule-item__header">
                <strong className="schedule-item__course">{courseCode}</strong>
                <time
                  className="schedule-item__time"
                  dateTime={`${day}T${timing.startTime}`}>
                  {day}, {timing.startTime} - {timing.endTime}
                </time>
              </header>
              <p className="schedule-item__details">
                {classroomVenue} &bull; {lecturerName}
              </p>

              <div className="reminder-control">
                <label htmlFor={`reminder-${id}`}>Reminder:</label>
                <select
                  id={`reminder-${id}`}
                  value={reminders[id] ?? 'none'}
                  onChange={(e) =>
                    handleReminderChange(
                      id,
                      e.target.value,
                      courseCode,
                      timing.startTime
                    )
                  }>
                  {reminderOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          )
        )
      )}
    </section>
  );
};

export default UpcomingSchedule;
