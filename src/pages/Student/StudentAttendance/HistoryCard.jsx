import {
  FaSignInAlt,
  FaSignOutAlt,
  FaCircle,
  FaStickyNote,
} from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { dateFormatter, timeFormatter } from '../../../utils/helpers';
import button from '../../../components/Button/Button';
import { formatDistanceToNow } from 'date-fns';

const HistoryCard = ({
  date,
  time,
  status = '',
  checkIn,
  checkOut,
  code,
  location,
  attStatus,
  courseCode,
  courseTitle,
  checkInStatus,
  checkOutStatus,
}) => {
  const style =
    status === 'on-time' || status === 'present'
      ? 'main-color'
      : status === 'partial'
      ? 'others'
      : status;

  return (
    <div
      className="s-attendance-history-card"
      style={{
        borderLeft: `6px solid var(--${style})`,
      }}>
      <div className="att_card_heading">
        <h3 className="course_code">{courseCode}</h3>
        <span className="course_title">{courseTitle}</span>
        <span className={`status_tag ${attStatus}`}>{attStatus}</span>
      </div>

      <div className="top">
        <p>
          {dateFormatter(date)}
          <span>
            {time.start || ''} - {time.end || ''}
          </span>
        </p>
        <div
          className="timing"
          style={{
            borderColor: `var(--${style})`,
            background: `var(--${style}-light)`,
            color: `var(--${style})`,
          }}>
          <FaCircle className={status} />{' '}
          {status === 'present' ? 'on time' : status.split('-').join(' ')}
        </div>
      </div>
      <hr />
      <div className="entries">
        <div className="entry">
          <p>
            <FaSignInAlt /> Check In
          </p>
          {checkIn?.time ? (
            <>
              <h3>{timeFormatter(checkIn.time)}</h3>
              <div className="meta">
                <small className="status">
                  {checkInStatus} •{' '}
                  {formatDistanceToNow(new Date(checkIn.time), {
                    addSuffix: true,
                  })}
                </small>
                {checkIn?.method && (
                  <small className="method">Via: {checkIn.method}</small>
                )}
                {checkIn?.distanceFromClassMeters != null && (
                  <small className="distance">
                    {Math.round(checkIn.distanceFromClassMeters)}m away
                  </small>
                )}
              </div>
            </>
          ) : (
            <h3 className="missed">-</h3>
          )}
        </div>
        <div className="entry">
          <p>
            <FaSignInAlt /> Check In
          </p>
          {checkOut?.time ? (
            <>
              <h3>{timeFormatter(checkOut.time)}</h3>
              <div className="meta">
                <small className="status">
                  {checkOutStatus} •{' '}
                  {formatDistanceToNow(new Date(checkOut.time), {
                    addSuffix: true,
                  })}
                </small>
                {checkOut?.method && (
                  <small className="method">Via: {checkOut.method}</small>
                )}
                {checkOut?.distanceFromClassMeters != null && (
                  <small className="distance">
                    {Math.round(checkOut.distanceFromClassMeters)}m away
                  </small>
                )}
              </div>
            </>
          ) : (
            <h3 className="missed">-</h3>
          )}
        </div>
      </div>
      <div className="bottom">
        <span>{code || ''}</span>
        <p>
          <MdLocationPin />
          {location || 'Not specified'}
        </p>
      </div>
      {status === 'absent' &&
        button.multiple({
          icon: FaStickyNote,
          element: 'Submit plea',
          name: 'submit-plea',
        })}
    </div>
  );
};

export default HistoryCard;
