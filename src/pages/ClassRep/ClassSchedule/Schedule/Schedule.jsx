import { useState } from 'react';
import {
  MdNotificationsActive,
  MdAudiotrack,
  MdImage,
  MdPictureAsPdf,
  MdOutlineMovie,
} from 'react-icons/md';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { groupByDay } from '../../../../utils/helpers';
import './Schedule.css';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// React-icon mapping for file types
const fileTypeIcons = {
  doc: <MdPictureAsPdf />,
  image: <MdImage />,
  video: <MdOutlineMovie />,
  audio: <MdAudiotrack />,
};

const Schedule = ({ data, isClassRep = false, onAddMedia }) => {
  const schedulesByDay = groupByDay(data);
  const [activeMediaCourse, setActiveMediaCourse] = useState(null);

  return (
    <div className="schedule-container">
      {/* Modal */}
      {activeMediaCourse && (
        <div
          className="media-modal-overlay"
          onClick={() => setActiveMediaCourse(null)}>
          <div
            className="media-modal"
            onClick={(e) => e.stopPropagation()}>
            <h3>
              Media for {activeMediaCourse.courseTitle} (
              {activeMediaCourse.courseCode})
            </h3>
            {activeMediaCourse.media?.length > 0 ? (
              <ul className="media-list">
                {activeMediaCourse.media.map((file) => (
                  <li
                    key={file.id}
                    className="media-item">
                    <span className="icon">{fileTypeIcons[file.fileType]}</span>
                    <span className="media-name">{file.name}</span>
                    <span className="file-type">({file.fileType})</span>
                    {isClassRep && (
                      <span className="media-actions">
                        <FiEdit3 title="Edit file" />
                        <FaTrash title="Delete file" />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No media files uploaded yet.</p>
            )}
            <button
              className="add-media-btn"
              onClick={() => onAddMedia?.(activeMediaCourse.id)}>
              <FaPlus /> Add Media
            </button>
            <button
              className="close-btn"
              onClick={() => setActiveMediaCourse(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Schedule cards by day */}
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
                {isClassRep && (
                  <div className="action">
                    <FaTrash title="Delete schedule" />
                    <FiEdit3 title="Edit schedule" />
                    <MdNotificationsActive title="Notify students" />
                  </div>
                )}
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
                <button
                  className="add-media-btn"
                  onClick={() => setActiveMediaCourse(course)}>
                  📁 View/Add Media
                </button>
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
