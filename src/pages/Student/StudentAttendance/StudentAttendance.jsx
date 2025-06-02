import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  MdCalendarToday,
  MdLocationPin,
  MdLogin,
  MdLogout,
  MdMessage,
  MdPhoneInTalk,
} from 'react-icons/md';
import {
  dateFormatter,
  parseTime2,
  parseTimeToday2,
} from '../../../utils/helpers';
import {
  FaCircle,
  FaClock,
  FaFlagCheckered,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import button from '../../../components/Button/Button';
import './StudentAttendance.css';
import { attendance } from '../../../assets/assets';
import {} from 'react-icons/ri';
import ClassStatus from '../../ClassRep/ClassRepDashboard/ClassStatus';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const filtered = attendance.filter((att) => {
    const attDate = new Date(att.DateCreated);

    console.log(attDate);
    console.log(att.DateCreated);
    return attDate >= now;
  });
  return (
    <div className="s-attendance">
      <section className="s-attendance-heading">
        <h1>My Attendance</h1>
        <div className="s-attendance-info">
          <div className="s-attendance-info-left">
            <h2>Basic Info</h2>
            <p>
              <MdCalendarToday />
              <span>Today {dateFormatter(null)}</span>
            </p>
            <hr />
            <ul className="marking-overview">
              <li>
                <FaCircle className="on-time" /> <b className="cap">on time</b>{' '}
                <span>80%</span>
              </li>
              <li>
                <FaCircle className="late" /> <b className="cap">late</b>{' '}
                <span>10%</span>
              </li>
              <li>
                <FaCircle className="absent" /> <b className="cap">absent</b>{' '}
                <span>10%</span>
              </li>
            </ul>
          </div>
          <div className="s-attendance-info-right">
            <div className="s-attendance-info-class-rep">
              <div className="profile">S</div>
              <div className="cred">
                <h3 className="cap">{user.name}</h3>
                <p>{user.role}</p>
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
                <div className="card">
                  <p className="cap">{card.title}</p>
                  <h2>{card.value}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="s-attendance-today">
        <header>
          Today's <hr />
        </header>
        <div className="today-attendance-cards">
          {filtered.map((att = {}, ind) => {
            const start = parseTimeToday2(att.Class_Start);
            const end = parseTimeToday2(att.Class_End);

            const today = new Date();

            const status =
              today < start
                ? 'not-started'
                : today > start && today < end
                ? 'in-progress'
                : 'ended';
            const entryStart = parseTime2(att.Class_Start, att.Entry_Start);
            return (
              <div
                className="today-attendance-card"
                key={ind}>
                <div className="top">
                  <p>{att.Code}</p>
                  <div className="status">
                    <ClassStatus status={status} />
                  </div>
                </div>
                <div className="mid">
                  <p>
                    <GiTeacher />
                    {att.Name}
                  </p>
                  <p>
                    <MdLocationPin />
                    {att.Location}
                  </p>
                  <div className="entries">
                    <div className="entry">
                      <p>
                        <FaClock />
                        Class Start
                      </p>
                      <h3>{att.Class_Start}</h3>
                    </div>
                    <div className="entry">
                      <p>
                        <FaFlagCheckered />
                        Class End
                      </p>
                      <h3>{att.Class_End}</h3>
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
                      <h3>{parseTime2(entryStart, att.Entry_End)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="s-attendance-history">
        <h1>Attendance History</h1>
        <div className="s-attendance-history-wrap">
          <div className="s-attendance-history-pagination cap">
            {button.normal({ element: 'prev', name: 'btn' })}
            <span>1</span>
            {button.normal({ element: 'next', name: 'btn' })}
          </div>
          <div className="s-attendance-history-cards">
            <div className="s-attendance-history-card">
              <div className="top">
                <p>
                  Wed, Aug 14, 2023
                  <span>03:00 - 05:00</span>
                </p>
                <div className="timing">
                  <FaCircle /> on time
                </div>
              </div>
              <hr />
              <div className="entries">
                <div className="entry">
                  <p>
                    <FaSignInAlt /> Check In
                  </p>
                  <h3>03:00</h3>
                </div>
                <div className="entry">
                  <p>
                    <FaSignOutAlt /> Check Out
                  </p>
                  <h3>03:10</h3>
                </div>
              </div>
              <div className="bottom">
                <span>BCH315</span>
                <p>
                  <MdLocationPin />
                  Auditorium
                </p>
              </div>
            </div>
            <div className="s-attendance-history-card">
              <div className="top">
                <p>
                  Wed, Aug 14, 2023
                  <span>03:00 - 05:00</span>
                </p>
                <div className="timing">
                  <FaCircle /> on time
                </div>
              </div>
              <hr />
              <div className="entries">
                <div className="entry">
                  <p>
                    <FaSignInAlt /> Check In
                  </p>
                  <h3>03:00</h3>
                </div>
                <div className="entry">
                  <p>
                    <FaSignOutAlt /> Check Out
                  </p>
                  <h3>03:10</h3>
                </div>
              </div>
              <div className="bottom">
                <span>BCH315</span>
                <p>
                  <MdLocationPin />
                  Auditorium
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentAttendance;
