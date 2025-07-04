import { useState } from 'react';
import {
  MdNotificationsActive,
  MdAudiotrack,
  MdImage,
  MdPictureAsPdf,
  MdOutlineMovie,
  MdFileOpen,
} from 'react-icons/md';
import { FaFolderOpen, FaPlus, FaTrash } from 'react-icons/fa';
import { FiDownload, FiEdit3 } from 'react-icons/fi';
import { groupByDay } from '../../../../utils/helpers';
import './Schedule.css';
import FileUploadModal from '../../../../components/Modals/FileUploadModal/FileUploadModal';
import button from '../../../../components/Button/Button';

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

const Schedule = ({ data, isClassRep = false }) => {
  const schedulesByDay = groupByDay(data);
  const [activeMediaCourse, setActiveMediaCourse] = useState(null);
  const [uploadCourseId, setUploadCourseId] = useState(null);

  const openUploadModal = (courseId) => {
    setUploadCourseId(courseId);
    console.log(courseId);
    // setActiveMediaCourse(null); // close media modal if open
  };

  const handleUpload = (courseId, media) => {
    console.log('Uploaded media:', courseId, media);
    setUploadCourseId(null);
    // Optionally refresh media for that course here, if you keep media in state
  };

  return (
    <div className="schedule-container">
      {/* Upload Modal */}
      <FileUploadModal
        isOpen={uploadCourseId}
        courseId={uploadCourseId}
        onClose={() => setUploadCourseId(null)}
        onUpload={handleUpload}
      />

      {/* Media Modal */}
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
                    {isClassRep && (
                      <span className="media-actions">
                        <FiDownload title="Download file" />
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

            <div className="action-btns">
              {button.multiple({
                name: 'add-media-btn',
                icon: FaPlus,
                func: () => openUploadModal(activeMediaCourse.id),
                element: 'add media',
              })}
              {button.normal({
                name: 'close-btn',
                func: () => setActiveMediaCourse(null),
                element: 'close',
              })}
            </div>
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
                {button.multiple({
                  name: 'add-media-btn',
                  func: () => setActiveMediaCourse(course),
                  icon: FaFolderOpen,
                  element: 'view/add media',
                })}
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
