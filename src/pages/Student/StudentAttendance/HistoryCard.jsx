import { FaSignInAlt, FaSignOutAlt, FaCircle } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';

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
          {date}
          <span>{time}</span>
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
          <h3>{checkIn}</h3>
        </div>
        <div className="entry">
          <p>
            <FaSignOutAlt /> Check Out
          </p>
          <h3>{checkOut}</h3>
        </div>
      </div>
      <div className="bottom">
        <span>{code}</span>
        <p>
          <MdLocationPin />
          {location}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;
