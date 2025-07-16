import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaRegCalendarCheck,
} from 'react-icons/fa';
import { dateFormatter } from '../../../../../utils/helpers';
import { MdLocationPin } from 'react-icons/md';

const SessionInfo = ({
  session = {
    location: { latitude: 0, longitude: 0 },
    lecturer: { name: '' },
    classTime: { start: '', end: '' },
  },
}) => {
  return (
    <div className="class-info">
      {[
        {
          icon: MdLocationPin,
          text: session.location
            ? `Location: (${session.location.latitude?.toFixed(
                4
              )}, ${session.location.longitude?.toFixed(4)})`
            : 'Location: Not specified',
        },
        {
          icon: FaChalkboardTeacher,
          text: `Lecturer: ${session.lecturer?.name ?? 'Unknown'}`,
        },
        {
          icon: FaRegCalendarCheck,
          text: `Attendance Date: ${
            session.classDate ? dateFormatter(session.classDate) : '—'
          }`,
        },
        {
          icon: FaBookOpen,
          text: `Course Code: ${session.courseCode}`,
        },
        {
          icon: FaBookOpen,
          text: `Course Title: ${session.courseTitle}`,
        },
        {
          icon: FaClock,
          text:
            session.classTime?.start && session.classTime?.end
              ? `Time: ${session.classTime.start} – ${session.classTime.end}`
              : 'Time: —',
        },
      ].map(({ icon, text }, i) => {
        const Icon = icon;
        return (
          <div
            key={i}
            className="info">
            <Icon />
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SessionInfo;
