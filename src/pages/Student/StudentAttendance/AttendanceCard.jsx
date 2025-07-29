import {
  FaClock,
  FaExclamationTriangle,
  FaFlagCheckered,
} from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import {
  getAttendanceTimes,
  parseTime2,
  parseTimeToday2,
} from '../../../utils/helpers';
import ClassStatus from '../../ClassRep/ClassRepDashboard/ClassStatus';
import button from '../../../components/Button/Button';
import { useCountdown } from '../../../hooks/useCountdown';
import { useErrorModal } from '../../../hooks/useErrorModal';
import CountdownBox from '../../../components/CountdownBox/CountdownBox';

const getAttendanceBlockReason = ({
  hasCheckedIn,
  hasCheckedOut,
  status,
  now,
  entryStart, // 'HH:mm'
  entryEnd, // 'HH:mm'
  allowEarly,
  reopened = false,
}) => {
  const minutesEarly = Math.round(
    (entryStart.getTime() - now.getTime()) / 60000
  );
  const minutesLate = Math.round((now.getTime() - entryEnd.getTime()) / 60000);

  if (status === 'ended') return 'This attendance session has already ended.';
  if (hasCheckedOut) return 'You have already checked out.';

  if (!hasCheckedIn && status === 'not-started' && !allowEarly)
    return `Attendance hasn’t started yet. You can begin by ${entryStart}.`;

  if (!allowEarly && now < entryStart)
    return `You’re ${minutesEarly} minute${
      minutesEarly === 1 ? '' : 's'
    } early. Check-in starts at ${entryStart}.`;

  if (!allowEarly && now > entryEnd && !reopened)
    return `You’re ${minutesLate} minute${
      minutesLate === 1 ? '' : 's'
    } late. Entries closed at ${entryEnd}.`;

  if (!hasCheckedIn && status !== 'in-progress' && !reopened)
    return 'Check-in is not active right now.';

  if (hasCheckedIn && !hasCheckedOut && now > entryEnd && !reopened)
    return `You didn’t check out in time. The session ended at ${entryEnd}, ${minutesLate} minute${
      minutesLate === 1 ? '' : 's'
    } ago.`;

  return null;
};

const AttendanceCard = ({ att, setIsModal, student }) => {
  const start = parseTimeToday2(att.classTime?.start);
  const end = parseTimeToday2(att.classTime?.end);
  const now = new Date();

  const status = att.reopened
    ? 'in-progress'
    : now < start
    ? 'not-started'
    : now < end
    ? 'in-progress'
    : 'ended';

  const entryStart = parseTime2(att.classTime?.start, att.entry?.start);
  const entryEnd = parseTime2(entryStart, att.entry?.end);

  const offsets = {
    checkInCloseTime: att.settings.checkInCloseTime,
    others: '0H10M',
  };
  const entry = { start: entryStart, end: entryEnd };

  const { checkInOpens, checkInCloses, checkOutOpens, checkOutCloses } =
    getAttendanceTimes({ att, offsets, entry });

  const checkInStartCountdown = useCountdown(checkInOpens);
  const checkInCloseCountdown = useCountdown(checkInCloses);
  const checkOutOpenCountdown = useCountdown(checkOutOpens);
  const checkOutCloseCountdown = useCountdown(checkOutCloses);

  const { open } = useErrorModal();

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

        {student.checkIn.time && student.checkOut.time ? (
          <></>
        ) : (
          <div className="attendance-card-countdown">
            {checkInStartCountdown.timeLeft > 0 && (
              <CountdownBox
                label="Check-In Opens In"
                countdown={checkInStartCountdown}
              />
            )}
            <CountdownBox
              label={
                checkInCloseCountdown.timeLeft > 0
                  ? 'Check-In Closes In'
                  : 'Check in Closed'
              }
              countdown={
                checkInCloseCountdown.timeLeft > 0
                  ? checkInCloseCountdown
                  : { minutes: 0, seconds: 0 }
              }
              icon={
                checkInCloseCountdown.timeLeft > 0 ? null : (
                  <FaExclamationTriangle color="var(--red)" />
                )
              }
            />
            {checkOutOpenCountdown.timeLeft > 0 && (
              <CountdownBox
                label="Check-Out Opens In"
                countdown={checkOutOpenCountdown}
              />
            )}
            {checkOutCloseCountdown.timeLeft > 0 && (
              <CountdownBox
                label="Check-Out Closes In"
                countdown={checkOutCloseCountdown}
              />
            )}
          </div>
        )}
      </div>
      <div className="entry-btns">
        {!student ? null : student.checkIn.time && student.checkOut.time ? (
          <p className="marked-message">
            ✅ You’re all set! Attendance marked 🎉
          </p>
        ) : (
          (() => {
            const hasCheckedIn = !!student.checkIn.time;
            const hasCheckedOut = !!student.checkOut.time;

            const reason = getAttendanceBlockReason({
              hasCheckedIn,
              hasCheckedOut,
              status,
              now,
              entryStart: parseTimeToday2(entryStart),
              entryEnd: parseTimeToday2(entryEnd),
              reopened: att.reopened,
              allowEarly: att.settings?.allowEarlyCheckInOut,
            });

            const isBlocked = Boolean(reason);

            const handleClick = () => {
              console.log('entry end', new Date(entryEnd));
              console.log('now', now);
              if (isBlocked) {
                open({
                  title: 'Cannot Proceed',
                  message: reason,
                  code: 'PROCESS_INVALID',
                  initiator: hasCheckedIn ? 'Check Out' : 'Check In',
                });
              } else {
                setIsModal({
                  visible: true,
                  maxRange: att.location?.radiusMeters,
                  attendanceId: att._id,
                  mode: hasCheckedIn ? 'checkOut' : 'checkIn',
                  location: {
                    lat: att.location?.latitude,
                    lng: att.location?.longitude,
                  },
                });
              }
            };

            return button.normal({
              element: hasCheckedIn ? 'Check Out' : 'Check In',
              disabled: status === 'not-started' || status === 'ended',
              func: handleClick,
              name: 'entry-btn',
            });
          })()
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;
