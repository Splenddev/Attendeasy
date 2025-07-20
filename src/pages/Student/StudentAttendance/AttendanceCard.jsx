import { FaClock, FaFlagCheckered } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { LuHourglass } from 'react-icons/lu';
import { parseTime2, parseTimeToday2 } from '../../../utils/helpers';
import ClassStatus from '../../ClassRep/ClassRepDashboard/ClassStatus';
import button from '../../../components/Button/Button';
import { useCountdown } from '../../../hooks/useCountdown';

const getDeadlineTime = (att, mode = 'checkIn') => {
  if (!att?.classTime || !att?.entry) return null;

  const offset = 10; // minutes – we'll later move this to backend config

  if (mode === 'checkIn') {
    return parseTimeToday2(parseTime2(att.classTime.start, `${offset}M`));
  }

  if (mode === 'checkOut') {
    return parseTimeToday2(parseTime2(att.classTime.end, `-${offset}M`));
  }

  return null;
};

const AttendanceCard = ({ att, setIsModal, student }) => {
  const start = parseTimeToday2(att.classTime?.start);
  const end = parseTimeToday2(att.classTime?.end);
  const now = new Date();

  const status =
    now < start ? 'not-started' : now < end ? 'in-progress' : 'ended';
  const entryStart = parseTime2(att.classTime?.start, att.entry?.start);
  const entryEnd = parseTime2(entryStart, att.entry?.end);

  const deadline = getDeadlineTime(
    att,
    !student.checkIn.time ? 'checkIn' : 'checkOut'
  ); // type is 'checkin' or 'checkout'

  // const tooLateToCheckIn = now > getDeadlineTime(att, 'checkin');
  // const tooEarlyToCheckOut = now < getDeadlineTime(att, 'checkout');

  const { minutes, seconds, timeLeft } = useCountdown(deadline);

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
        {timeLeft > 0 ? (
          <div className={`countdown-timer `}>
            <span className="icon">
              <LuHourglass />
            </span>
            <span>
              Time left until session{' '}
              {student.checkIn.time ? 'closes' : 'opens'}:{' '}
              <span className="highlight">
                {minutes}m {seconds}s
              </span>
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      {!student ? (
        <></>
      ) : student.checkIn.time && student.checkOut.time ? (
        <p>Marked</p>
      ) : (
        button.normal({
          element: !student.checkIn.time ? 'Check In' : 'Check Out',
          disabled:
            status === 'ended' ||
            (status === 'not-started' && !att.allowEarlyCheckInOut),
          func: () =>
            setIsModal({
              visible: true,
              maxRange: att.location?.radiusMeters,
              attendanceId: att._id,
              mode: !student.checkIn.time ? 'checkIn' : 'checkOut',
              location: {
                lat: att.location?.latitude,
                lng: att.location?.longitude,
              },
            }),
          //disabled: status !== 'in-progress'
        })
      )}
    </div>
  );
};

export default AttendanceCard;
