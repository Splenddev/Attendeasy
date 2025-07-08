import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

import styles from './StudentSchedules.module.css'; // use your CSS module or classNames

const scheduleData = {
  groupId: '686c62fc03b06ec373f13c00',
  entries: [
    {
      day: 'Monday',
      classes: [
        {
          courseTitle: 'Analytical Biochemistry',
          courseCode: 'BCH301',
          startTime: '06:00',
          endTime: '08:00',
          venue: 'Auditorium',
          classType: 'Physical',
          lecturer: 'Prof. Adewale Benson',
        },
      ],
    },
    {
      day: 'Tuesday',
      classes: [
        {
          courseTitle: 'Analytical Biochemistry',
          courseCode: 'BCH301',
          startTime: '14:00',
          endTime: '16:00',
          venue: 'Lab',
          classType: 'Physical',
          lecturer: 'Prof. Adewale Benson',
          media: [
            {
              src: 'https://res.cloudinary.com/dkck32tv3/image/upload/v1751960172/schedule-media/686c64f403b06ec373f13c1f/copilot_image_1751707401026-1751960172307.png',
              type: 'image',
            },
          ],
        },
      ],
    },
    {
      day: 'Wednesday',
      classes: [
        {
          courseTitle: 'Analytical Biochemistry',
          courseCode: 'BCH301',
          startTime: '10:00',
          endTime: '12:00',
          venue: 'Auditorium',
          classType: 'Physical',
          lecturer: 'Prof. Adewale Benson',
        },
      ],
    },
  ],
};

const StudentSchedules = () => {
  const { user, setNavTitle } = useAuth();

  useEffect(() => {
    setNavTitle('My Class Schedules');
  }, [setNavTitle]);

  return (
    <div className={styles.schedulePage}>
      <h1 className={styles.title}>My Class Schedule</h1>
      <p className={styles.subtext}>
        Your weekly class activities at a glance.
      </p>

      <section className={styles.weeklyGrid}>
        {scheduleData.entries.map((dayBlock) => (
          <div
            key={dayBlock.day}
            className={styles.dayColumn}>
            <h3 className={styles.dayTitle}>{dayBlock.day}</h3>
            {dayBlock.classes.map((cls, i) => (
              <div
                key={i}
                className={styles.classCard}>
                <h4>
                  {cls.courseTitle} ({cls.courseCode})
                </h4>
                <p>
                  <strong>🕒</strong> {cls.startTime} – {cls.endTime}
                </p>
                <p>
                  <strong>🏫</strong> {cls.venue}
                </p>
                <p>
                  <strong>👨‍🏫</strong> {cls.lecturer}
                </p>
                <p>
                  <strong>📌</strong> {cls.classType}
                </p>

                {cls.media && (
                  <div className={styles.mediaPreview}>
                    {cls.media.map((m, j) => (
                      <img
                        key={j}
                        src={m.src}
                        alt="class media"
                        className={styles.mediaImg}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.nextClass}>
        <h2>Next Class</h2>
        <div className={styles.nextCard}>
          <h3>Analytical Biochemistry</h3>
          <p>
            <strong>🕒</strong> Tuesday, 14:00 – 16:00
          </p>
          <p>
            <strong>🏫</strong> Lab
          </p>
          <p>
            <strong>👨‍🏫</strong> Prof. Adewale Benson
          </p>
          <div className={styles.actions}>
            <button>Set Reminder</button>
            <button>Open Class Notes</button>
          </div>
        </div>
      </section>

      <section className={styles.upcomingList}>
        <h2>Upcoming Schedule</h2>
        <ul>
          {scheduleData.entries.flatMap((entry) =>
            entry.classes.map((cls, idx) => (
              <li key={`${entry.day}-${idx}`}>
                <span className={styles.dayTag}>{entry.day}</span>
                <span className={styles.timeTag}>
                  {cls.startTime} – {cls.endTime}
                </span>
                <span className={styles.courseTag}>{cls.courseTitle}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default StudentSchedules;
