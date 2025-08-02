import button from '../../../../../components/Button/Button';
import { useCountdown } from '../../../../../hooks/useCountdown';
import {
  formatTimeLeft,
  getAttendanceTimes,
  getStatusStyle,
} from '../../../../../utils/helpers';
import { MdAddchart } from 'react-icons/md';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { useNavigate } from 'react-router-dom';

function checkIfDeadlinePassed(count) {
  return count <= 0;
}

const getStatusMessage = (checkin, finalStatus, deadlinePassed = false) => {
  if ((!checkin.time && !finalStatus) || finalStatus === 'absent') {
    return deadlinePassed
      ? 'You missed the check-in deadline and are marked absent.'
      : 'You have not checked in. Please mark your attendance before time runs out.';
  }

  switch (finalStatus) {
    case 'on_time':
    case 'present':
      return 'You are marked present. Great job!';
    case 'late':
      return 'You checked in late. Try to be earlier next time.';
    case 'left_early':
      return 'You left class early.';
    case 'late_left_early':
    case 'partial':
    case 'not_checkout':
      return 'You attended partially. Your status may affect your record.';
    case 'excused':
      return '📄 You were excused from this session.';
    case 'absent':
      return deadlinePassed
        ? '❌ You did not attend this class.'
        : '⚠️ You have not marked attendance. You still have time to do so.';
    default:
      return 'ℹ️ Attendance status unknown.';
  }
};

const OngoingSession = ({ session, timeData }) => {
  const { offsets, entry } = timeData;
  const { checkInCloses, checkOutCloses } = getAttendanceTimes({
    att: session,
    offsets,
    entry,
  });
  const navigate = useNavigate();
  const countdown1 = useCountdown(checkInCloses.getTime());
  const timer1 = formatTimeLeft(countdown1, 'human');
  const countdown2 = useCountdown(checkOutCloses.getTime());
  const timer2 = formatTimeLeft(countdown2, 'human');

  const { enableCheckInOut } = session.settings || {};

  const all = session.studentRecords.length;
  const unmarked = session.studentRecords.filter(
    (st) => st.finalStatus === 'absent'
  ).length;
  const marked = ((all - unmarked) / all) * 100;

  const isCheckedIn = session.myRecord.checkIn.time;
  const isCheckedOut = session.myRecord.checkOut.time;
  const isFullyMarked = enableCheckInOut
    ? isCheckedIn && isCheckedOut
    : isCheckedIn;

  const deadlinePassed = checkIfDeadlinePassed(countdown1.timeLeft);

  const style = getStatusStyle(session.myRecord.finalStatus);

  return (
    <div
      key={session._id}
      className="ongoing-session">
      <div className="top">
        <h3>Today</h3>
        <span
          className={style}
          style={{
            background: `var(--${style}-light)`,
            border: `1px solid var(--${style})`,
          }}>
          {session.myRecord.finalStatus || '-'}
        </span>
      </div>
      <hr />
      <div className="head">
        <MdAddchart />
        {(countdown1.timeLeft > 0 || countdown2.timeLeft > 0) && (
          <div className="time-left">
            Time left:
            <span>
              {' '}
              {!isCheckedIn
                ? timer1 === '0s'
                  ? ''
                  : timer1
                : timer2 === '0s'
                ? ''
                : timer2}
            </span>
          </div>
        )}
      </div>
      <div className="mid">
        <div className="mid-left">
          <h3>{session.courseCode}</h3>
          <p>
            {getStatusMessage(
              session.myRecord.checkIn,
              session.myRecord.finalStatus,
              deadlinePassed
            )}
          </p>
        </div>
        <ProgressBar
          text
          percent={parseInt(marked, 10)}
          styled
        />
      </div>

      {!isFullyMarked &&
        button.normal({
          element: 'mark presence',
          name: 'cap',
          func: () =>
            navigate(
              `/student/attendance?id=${session._id}&status=${
                enableCheckInOut
                  ? isCheckedIn
                    ? 'not_checked_out'
                    : 'not_checked_in'
                  : 'not_checked_in'
              }&lat=${session.location.latitude}&lng=${
                session.location.longitude
              }`
            ),
        })}
    </div>
  );
};

export default OngoingSession;
