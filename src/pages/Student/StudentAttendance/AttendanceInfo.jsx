import { MdCalendarToday, MdMessage, MdPhoneInTalk } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import button from '../../../components/Button/Button';

const AttendanceInfo = ({
  user,
  date,
  data = { onTime: '-%', late: '-%', absent: '-%' },
}) => {
  return (
    <section className="s-attendance-heading">
      <h1>My Attendance</h1>
      <div className="s-attendance-info">
        <div className="s-attendance-info-left">
          <h2>Basic Info</h2>
          <p>
            <MdCalendarToday />
            <span>Today {date}</span>
          </p>
          <hr />
          <ul className="marking-overview">
            <li>
              <FaCircle className="on-time" /> <b className="cap">on time</b>{' '}
              <span>{data.onTime}%</span>
            </li>
            <li>
              <FaCircle className="late" /> <b className="cap">late</b>{' '}
              <span>{data.late}%</span>
            </li>
            <li>
              <FaCircle className="absent" /> <b className="cap">absent</b>{' '}
              <span>{data.absent}%</span>
            </li>
          </ul>
        </div>
        <div className="s-attendance-info-right">
          <div className="s-attendance-info-class-rep">
            <div className="profile">S</div>
            <div className="cred">
              <h3 className="cap">{user.name}</h3>
              <p>{user.role || 'role'}</p>
              <p>classrep@gmail.com</p>
              <div className="btn">
                {button.icon({ icon: MdPhoneInTalk, label: 'reps contact' })}
                {button.icon({ icon: MdMessage, label: 'message rep' })}
              </div>
            </div>
          </div>
          <div className="class-rep-mini-cards">
            {[
              { title: 'total attendance', value: 12 },
              { title: 'total schedules', value: 10 },
            ].map((card) => (
              <div
                key={card.title}
                className="card">
                <p className="cap">{card.title}</p>
                <h2>{card.value}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceInfo;
