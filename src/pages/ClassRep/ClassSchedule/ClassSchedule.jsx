// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
// import { useEffect } from 'react';
// import { schedule } from './assets';
// import Schedule from './Schedule/Schedule';
// import { FaCrown, FaPlus } from 'react-icons/fa';
// import './ClassSchedule.css';
// import button from '../../../components/Button/Button';
// const ClassSchedule = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setNavTitle } = useAuth();
//   useEffect(() => {
//     setNavTitle('Class Schedules');
//   }, [setNavTitle]);
//   return (
//     <div className="class-schedule">
//       <div className="cap">
//         <h2>
//           <FaCrown />
//           Welcome, {user.name}
//         </h2>
//         <NavLink to={'create'}>
//           {button.multiple({
//             icon: FaPlus,
//             name: 'create-schedule-btn',
//             element: ' New Schedule',
//           })}
//         </NavLink>
//       </div>
//       <div className="class-schedule-container">
//         <Schedule
//           data={schedule}
//           isClassRep={user.role === 'class-rep'}
//         />
//       </div>
//       <p
//         onClick={() => {
//           navigate(location.pathname + '/create');
//         }}>
//         Class Schedule
//       </p>
//       <p>{location.pathname}</p>
//     </div>
//   );
// };

// export default ClassSchedule;

import React from 'react';
import {
  FaChalkboardTeacher,
  FaClock,
  FaMapMarkerAlt,
  FaBookOpen,
} from 'react-icons/fa';
import { FiFileText, FiVideo, FiImage, FiMusic } from 'react-icons/fi';
import './ClassSchedule.css';
import { scheduleJson } from './assets';

const fileTypeIcons = {
  doc: <FiFileText />,
  video: <FiVideo />,
  image: <FiImage />,
  audio: <FiMusic />,
};

const ScheduleCard = ({ schedule }) => {
  return (
    <div className="schedule-card">
      <div className="header">
        <h2>
          {schedule.courseTitle} ({schedule.courseCode})
        </h2>
        <span className="repeat">{schedule.repeat.toUpperCase()}</span>
      </div>

      <div className="info">
        <p>
          <FaChalkboardTeacher /> <strong>{schedule.lecturerName}</strong>
        </p>
        <p>
          <FaMapMarkerAlt /> {schedule.classroomVenue}
        </p>
        <p>
          <FaBookOpen /> {schedule.level} Level - {schedule.department},{' '}
          {schedule.faculty}
        </p>
      </div>

      <div className="timings">
        {schedule.classDaysTimes.map(({ day, timing }) => (
          <div
            key={day}
            className="time-slot">
            <FaClock className="clock-icon" />
            <span>
              <strong>{day}:</strong> {timing.startTime} – {timing.endTime}
            </span>
          </div>
        ))}
      </div>

      <div className="media-section">
        <h4>Attached Media</h4>
        <ul className="media-list">
          {schedule.media.map((media) => (
            <li
              key={media.id}
              className={`media-item ${
                media.approved ? 'approved' : 'pending'
              }`}>
              {fileTypeIcons[media.fileType]} <span>{media.name}</span>
              <small>
                {media.dateAdded} | {media.timeAdded}
              </small>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer">
        <p>
          Attendance Marking:{' '}
          <strong>
            {schedule.allowAttendanceMarking ? 'Enabled' : 'Disabled'}
          </strong>
        </p>
        <p>
          Notification Lead Time:{' '}
          <strong>{schedule.notificationLeadTime} mins</strong>
        </p>
      </div>
    </div>
  );
};

const ClassSchedule = () => {
  return (
    <div className="schedule-page">
      <h1>Weekly Class Schedule</h1>
      <div className="schedule-grid">
        {scheduleJson.map((schedule) => (
          <ScheduleCard
            key={`${schedule.courseCode}-${schedule.lecturerName}`}
            schedule={schedule}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassSchedule;
