import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaRegCalendarCheck,
} from 'react-icons/fa';
import { dateFormatter, parseTime2 } from '../../../../../utils/helpers';
import { MdLocationPin } from 'react-icons/md';
import { LuCloudCog, LuInspectionPanel, LuZap, LuZapOff } from 'react-icons/lu';

const SessionInfo = ({
  session = {
    location: { latitude: 0, longitude: 0 },
    lecturer: { name: '' },
    classTime: { start: '', end: '' },
  },
}) => {
  const entryStart = parseTime2(session.classTime?.start, session.entry?.start);
  const entryEnd = parseTime2(entryStart, session.entry?.end);
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
          icon: session.autoEnd ? LuZap : LuZapOff,
          text: `Auto End: ${session.autoEnd ? 'Yes' : 'No'}`,
        },
        {
          icon:
            session.settings?.markingConfig.type === 'strict'
              ? LuZap
              : LuInspectionPanel,
          text: `Mode: ${session.settings.markingConfig.type}`,
        },
        {
          icon: FaClock,
          text:
            session.classTime?.start && session.classTime?.end
              ? `Time: ${session.classTime.start} – ${session.classTime.end}`
              : 'Time: —',
        },
        {
          icon: FaClock,
          text:
            session.entry?.start && session.entry?.end
              ? `Entry Window: ${entryStart} – ${entryEnd}`
              : 'Entry Window: —',
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
