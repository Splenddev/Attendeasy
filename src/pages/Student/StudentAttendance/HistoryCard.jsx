import {
  FaSignInAlt,
  FaSignOutAlt,
  FaCircle,
  FaStickyNote,
} from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { dateFormatter } from '../../../utils/helpers';
import button from '../../../components/Button/Button';

const HistoryCard = ({
  date,
  time,
  status = '',
  checkIn,
  checkOut,
  code,
  location,
}) => {
  const style = status === 'on-time' ? 'main-color' : status;

  return (
    <div
      className="s-attendance-history-card"
      style={{
        borderLeft: `6px solid var(--${style})`,
      }}>
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
          <FaCircle className={status} /> {status.split('-').join(' ')}
        </div>
      </div>
      <hr />
      <div className="entries">
        <div className="entry">
          <p>
            <FaSignInAlt /> Check In
          </p>
          <h3>{checkIn?.time ? checkIn?.time : '-'}</h3>
        </div>
        <div className="entry">
          <p>
            <FaSignOutAlt /> Check Out
          </p>
          <h3>{checkOut?.time ? checkOut?.time : '-'}</h3>
        </div>
      </div>
      <div className="bottom">
        <span>{code || ''}</span>
        <p>
          <MdLocationPin />
          {location || 'Not specified'}
        </p>
      </div>
      {button.multiple({
        icon: FaStickyNote,
        element: 'Submit plea',
        name: 'submit-plea',
      })}
    </div>
  );
};

export default HistoryCard;
