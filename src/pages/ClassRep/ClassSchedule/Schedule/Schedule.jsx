import { MdNotificationsActive } from 'react-icons/md';
import './Schedule.css';
import { FaTrash } from 'react-icons/fa';
import { FiAlertOctagon, FiEdit3 } from 'react-icons/fi';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Group courses by day using reduce
const groupByDay = (schedule) => {
  return schedule.reduce((acc, course) => {
    course.classDaysTimes.forEach(({ day, timing }) => {
      if (!acc[day]) acc[day] = [];

      acc[day].push({
        courseTitle: course.courseTitle,
        courseCode: course.courseCode,
        lecturerName: course.lecturerName,
        classroomVenue: course.classroomVenue,
        timing,
        media: course.media,
      });
    });
    return acc;
  }, {});
};

const Schedule = ({ data }) => {
  const schedulesByDay = groupByDay(data);

  return (
    <div className="schedule-container">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="day-section">
          <h2 className="day-header">{day}</h2>
          {schedulesByDay[day] ? (
            schedulesByDay[day].map((course, index) => (
              <div
                key={index}
                className="course-block">
                <div className="action">
                  <FaTrash title="delete schedule" />
                  <FiEdit3 title="edit schedule" />
                  <MdNotificationsActive />
                </div>
                <h3>
                  {course.courseTitle}{' '}
                  <span className="code">({course.courseCode})</span>
                </h3>
                <p className="first">
                  <strong>Lecturer:</strong> {course.lecturerName}
                </p>
                <p>
                  <strong>Venue:</strong> {course.classroomVenue}
                </p>
                <p>
                  <strong>Time:</strong> {course.timing.startTime} -{' '}
                  {course.timing.endTime}
                </p>
              </div>
            ))
          ) : (
            <p className="no-class">No classes</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
