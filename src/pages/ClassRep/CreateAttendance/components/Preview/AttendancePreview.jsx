import './AttendancePreview.css';
import { MdCalendarMonth, MdTimer, MdPerson } from 'react-icons/md';
import { FaMapPin } from 'react-icons/fa';
const AttendancePreview = ({ data }) => {
  const {
    date = '2025-07-01',
    startTime = '08:00',
    endTime = '10:00',
    location = 'Science Hall A',
    allowedStudents = 42,
    range = '100m',
  } = data || {};

  return (
    <div className="attendance-preview">
      <h3>Session Preview</h3>
      <div className="preview-item">
        <MdCalendarMonth className="icon" />
        <span>{date}</span>
      </div>
      <div className="preview-item">
        <MdTimer className="icon" />
        <span>
          {startTime} - {endTime}
        </span>
      </div>
      <div className="preview-item">
        <FaMapPin className="icon" />
        <span>
          {location} <small className="range">({range} radius)</small>
        </span>
      </div>
      <div className="preview-item">
        <MdPerson className="icon" />
        <span>{allowedStudents} students</span>
      </div>
    </div>
  );
};

export default AttendancePreview;
