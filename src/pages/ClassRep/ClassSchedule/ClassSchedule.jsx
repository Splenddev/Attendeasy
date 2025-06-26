import { useState, useEffect } from 'react';
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaCalendarAlt,
  FaStopwatch20,
  FaStopwatch,
  FaCalendarPlus,
  FaCalendarCheck,
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import styles from './ClassSchedule.module.css';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const OverviewPanel = ({
  totalCourses,
  mediaCount,
  totalLecturers,
  creatorId,
  countdown,
}) => (
  <div className={styles.overviewPanel}>
    <h2>Schedule Overview</h2>
    <div className={styles.overviewStats}>
      <div>
        <FaBookOpen /> <strong>{totalCourses}</strong> Courses
      </div>
      <div>
        <FiFileText /> <strong>{mediaCount}</strong> Media Files
      </div>
      <div>
        <FaChalkboardTeacher /> <strong>{totalLecturers}</strong> Lecturers
      </div>
      <div>
        <FaCalendarAlt /> Created by: <code>{creatorId}</code>
      </div>
    </div>
    {countdown && (
      <p className={styles.countdown}>
        <FaStopwatch /> Next class starts in: <strong>{countdown}</strong>
      </p>
    )}
  </div>
);

const formatTimeDiff = (target) => {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return null;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0 || hours > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result.trim();
};

const getDayStatuses = (data) => {
  const now = new Date();
  const statuses = {};

  weekdays.forEach((day) => {
    let upcoming = 0;
    let active = 0;

    data.forEach((schedule) => {
      schedule.classDaysTimes.forEach((t) => {
        if (t.day === day) {
          const [hStart, mStart] = t.timing.startTime.split(':').map(Number);
          const [hEnd, mEnd] = t.timing.endTime.split(':').map(Number);

          const start = new Date();
          start.setHours(hStart, mStart, 0, 0);
          const end = new Date();
          end.setHours(hEnd, mEnd, 0, 0);

          if (now < start) upcoming += 1;
          else if (now >= start && now <= end) active += 1;
        }
      });
    });

    statuses[day] = { upcoming, active };
  });

  return statuses;
};

import { scheduleJson } from './assets';
import { useAuth } from '../../../context/AuthContext';
import ScheduleCard from './components/ScheduleCard/ScheduleCard';
import { AlertModal } from '../../../components/Modals';
import button from '../../../components/Button/Button';
import { MdAddTask, MdCheck } from 'react-icons/md';
import { routesNavigate } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const ClassSchedule = () => {
  const { user, setNavTitle } = useAuth();
  useEffect(() => {
    setNavTitle('Class Schedules');
  }, [setNavTitle]);
  const scheduleData = scheduleJson;

  const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(weekday);
  const [showModal, setShowModal] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [dayStatuses, setDayStatuses] = useState(() =>
    getDayStatuses(scheduleData)
  );

  // Update countdown for next class today
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const now = new Date();

    const upcoming = scheduleData
      .flatMap((s) =>
        s.classDaysTimes
          .filter((t) => t.day === today)
          .map((t) => {
            const [h, m] = t.timing.startTime.split(':').map(Number);
            const classTime = new Date();
            classTime.setHours(h, m, 0, 0);
            return { courseCode: s.courseCode, time: classTime };
          })
      )
      .filter((item) => item.time > now)
      .sort((a, b) => a.time - b.time);

    if (upcoming.length > 0) {
      const timer = setInterval(() => {
        const diff = formatTimeDiff(upcoming[0].time);
        if (diff) setCountdown(diff);
        else setCountdown(null);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCountdown(null);
    }
  }, [scheduleData]);

  // Real-time update of badge statuses every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setDayStatuses(getDayStatuses(scheduleData));
    }, 60000);

    return () => clearInterval(interval);
  }, [scheduleData]);

  const filteredSchedules = scheduleData.filter((s) =>
    s.classDaysTimes.some((t) => t.day === selectedDay)
  );

  const dayScheduleDetails = scheduleData.flatMap((schedule) =>
    schedule.classDaysTimes
      .filter(({ day }) => day === selectedDay)
      .map(({ timing }) => ({
        courseCode: schedule.courseCode,
        startTime: timing.startTime,
        endTime: timing.endTime,
      }))
  );

  const totalCourses = scheduleData.length;
  const mediaCount = scheduleData.reduce(
    (acc, cur) => acc + cur.media.length,
    0
  );
  const uniqueLecturers = [...new Set(scheduleData.map((s) => s.lecturerName))];
  const creatorId = scheduleData[0]?.createdBy || 'N/A';

  return (
    <div className={styles.schedulePage}>
      {showModal && (
        <AlertModal
          todaySchedules={dayScheduleDetails}
          onClose={() => setShowModal(false)}
        />
      )}

      <OverviewPanel
        totalCourses={totalCourses}
        mediaCount={mediaCount}
        totalLecturers={uniqueLecturers.length}
        creatorId={creatorId}
        countdown={countdown}
      />

      <div className={styles.daySelector}>
        {weekdays.map((day) => {
          const { upcoming = 0, active = 0 } = dayStatuses[day] || {};
          const isSelected = day === selectedDay;
          const isToday = day === weekday;
          const hasOngoing = active > 0 && isToday;
          const hasUpcoming = upcoming > 0 && isToday;

          let badge = null;
          if (hasOngoing) {
            badge = (
              <span
                className={styles.activeBadge}
                title="Class ongoing">
                Now
              </span>
            );
          } else if (hasUpcoming) {
            badge = (
              <span
                className={styles.badge}
                title="Upcoming classes">
                {upcoming}
              </span>
            );
          } else if (isToday) {
            badge = (
              <span className={styles.badge}>
                <FaCalendarCheck />
              </span>
            );
          }

          return (
            <button
              key={day}
              className={isSelected ? styles.activeDayBtn : ''}
              onClick={() => setSelectedDay(day)}>
              {day}
              {badge}
            </button>
          );
        })}
      </div>

      <div className={styles.dayGroup}>
        <div className={styles.dayHeading}>
          <h2>{selectedDay}</h2>
          {button.multiple({
            element: 'Add',
            icon: FaCalendarPlus,
            func: () => navigate('create'),
          })}
        </div>
        <div className={styles.scheduleGrid}>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => (
              <ScheduleCard
                key={`${schedule.courseCode}-${schedule.lecturerName}`}
                schedule={schedule}
                user={user}
                isToday={selectedDay === weekday}
              />
            ))
          ) : (
            <p style={{ padding: '1rem', color: '#64748b' }}>
              No schedules for this day.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
