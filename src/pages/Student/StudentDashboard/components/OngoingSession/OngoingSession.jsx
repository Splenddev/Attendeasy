import button from '../../../../../components/Button/Button';
import { useCountdown } from '../../../../../hooks/useCountdown';
import {
  formatTimeLeft,
  getAttendanceTimes,
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
      ? '❌ You missed the check-in deadline and are marked absent.'
      : '⚠️ You have not checked in. Please mark your attendance before time runs out.';
  }

  switch (finalStatus) {
    case 'on_time':
    case 'present':
      return '✅ You are marked present. Great job!';
    case 'late':
      return '⏱ You checked in late. Try to be earlier next time.';
    case 'left_early':
      return '🚪 You left class early.';
    case 'late_left_early':
    case 'partial':
      return '⚠️ You attended partially. Your status may affect your record.';
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
  const { checkInCloses } = getAttendanceTimes({
    att: session,
    offsets,
    entry,
  });
  const navigate = useNavigate();
  const countdown = useCountdown(checkInCloses.getTime());
  const timer = formatTimeLeft(countdown, 'human');

  const deadlinePassed = checkIfDeadlinePassed(countdown.timeLeft);

  return (
    <div
      key={session._id}
      className="ongoing-session">
      <div className="top">
        <h3>Today</h3>
        <span>{session.myRecord.finalStatus || '-'}</span>
      </div>
      <hr />
      <div className="mid">
        <div className="mid-left">
          <MdAddchart />
          <h3>{session.courseCode}</h3>
          <p>
            {getStatusMessage(
              session.myRecord.checkIn,
              session.myRecord.finalStatus,
              deadlinePassed
            )}
          </p>

          {countdown.timeLeft > 0 && (
            <p className="time-left">
              Time left : <span> {timer === '0s' ? '' : timer}</span>
            </p>
          )}
        </div>
        <ProgressBar
          text
          percent={18}
          styled
        />
      </div>
      {button.normal({
        element: 'mark presence',
        name: 'cap',
        func: () =>
          navigate(
            `/student/attendance?id=${session._id}&status=${
              session.myRecord.checkIn.time
                ? 'not_checked_out'
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
