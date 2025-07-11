import { FaClock, FaFlagCheckered } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { parseTime2, parseTimeToday2 } from '../../../utils/helpers';
import ClassStatus from '../../ClassRep/ClassRepDashboard/ClassStatus';
import button from '../../../components/Button/Button';
import { attendance } from '../../../assets/assets';

const AttendanceCard = ({ att, isModal, setIsModal, student }) => {
  const start = parseTimeToday2(att.classTime?.start);
  const end = parseTimeToday2(att.classTime?.end);
  const now = new Date();

  const status =
    now < start ? 'not-started' : now < end ? 'in-progress' : 'ended';
  const entryStart = parseTime2(att.classTime?.start, att.entry?.start);
  const entryEnd = parseTime2(entryStart, att.entry?.end);

  return (
    <div className="today-attendance-card">
      <div className="top">
        <p>{att.courseCode}</p>
        <div className="status">
          <ClassStatus status={status} />
        </div>
      </div>
      <div className="mid">
        <p>
          <GiTeacher />
          {att.lecturer?.name}
        </p>
        <p>
          <MdLocationPin />
          {att.location?.latitude}, {att.location?.longitude}
        </p>
        <div className="entries">
          <div className="entry">
            <p>
              <FaClock />
              Class Start
            </p>
            <h3>{att.classTime?.start}</h3>
          </div>
          <div className="entry">
            <p>
              <FaFlagCheckered />
              Class End
            </p>
            <h3>{att.classTime?.end}</h3>
          </div>
          <div className="entry">
            <p>
              <FaClock />
              Entry Start
            </p>
            <h3>{entryStart}</h3>
          </div>
          <div className="entry">
            <p>
              <FaFlagCheckered />
              Entry End
            </p>
            <h3>{entryEnd}</h3>
          </div>
        </div>
      </div>
      {button.normal({
        element: !student.checkIn.time ? 'Check In' : 'Check Out',
        func: () =>
          setIsModal({
            visible: true,
            maxRange: att.location?.radiusMeters,
            attendanceId: att._id,
            mode: !student.checkIn.time ? 'checkIn' : 'checkOut',
          }),
        //disabled: status !== 'in-progress'
      })}
    </div>
  );
};

export default AttendanceCard;
