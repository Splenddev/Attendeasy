import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  MdCalendarToday,
  MdCallMade,
  MdContactPhone,
  MdMessage,
  MdPhoneInTalk,
} from 'react-icons/md';
import { dateFormatter } from '../../../utils/helpers';
import { FaCircle } from 'react-icons/fa';
import button from '../../../components/Button/Button';
import './StudentAttendance.css';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);

  return (
    <div className="s-attendance">
      <section className="s-attendance-heading">
        <h1>My Attendance</h1>
        <div className="s-attendance-info">
          <div className="s-attendance-info-left">
            <p>
              <MdCalendarToday />
              <span>Today {dateFormatter(null)}</span>
            </p>
            <hr />
            <ul className="marking-overview">
              <li>
                <FaCircle /> <b className="cap">on time</b> <span>80%</span>
              </li>
              <li>
                <FaCircle /> <b className="cap">late</b> <span>10%</span>
              </li>
              <li>
                <FaCircle /> <b className="cap">absent</b> <span>10%</span>
              </li>
            </ul>
          </div>
          <div className="s-attendance-info-right">
            <div className="s-attendance-info-class-rep">
              <div className="profile">S</div>
              <div className="cred">
                <h3>{user.name}</h3>
                <p>{user.role}</p>
                <p>classrep@gmail.com</p>
                <div className="btn">
                  {button.icon({ icon: MdPhoneInTalk, label: 'reps contact' })}
                  {button.icon({ icon: MdMessage, label: 'message rep' })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="s-attendance-today">
        <h1>My Attendance</h1>
      </section>
      <section className="s-attendance-history">
        <h1>My Attendance</h1>
      </section>
    </div>
  );
};

export default StudentAttendance;
