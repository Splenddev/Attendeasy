import {
  MdAccessTime,
  MdAddchart,
  MdHistory,
  MdTimelapse,
} from 'react-icons/md';
import { useAuth } from '../../../context/AuthContext';
import { dateFormatter, timeFormatter } from '../../../utils/helpers';
import './StudentDashboard.css';
import button from '../../../components/Button/Button';
import { FaCircle, FaHistory, FaRegClock } from 'react-icons/fa';
import ProgressBar from './ProgressBar/ProgressBar';
import { LuBookCheck } from 'react-icons/lu';
import MultiSegmentProgressBar from './ProgressBar/MultiSegmentProgressBar ';

const StudentDashboard = () => {
  const { user } = useAuth();
  const color = 'orange';
  const now = new Date();
  return (
    <div className="s-dashboard">
      <header className="s-dashboard-header">
        <section>
          <p className="cap">Good Morning, {user.name}</p>
          <span>You have 2 upcoming schedules and 1 attendance</span>
        </section>
        <section className="curr-date">
          <div>
            <p>Current date</p>
            <span>
              {dateFormatter(now)} {timeFormatter(now)}
            </span>
          </div>
          <MdTimelapse />
        </section>
      </header>
      <hr />
      <div className="s-dashboard-body">
        <div className="s-dashboard-body-first">
          <section className="today-schedule left">
            <div className="top">
              <h3>Today</h3>
              <span>Absent</span>
            </div>
            <hr />
            <div className="mid">
              <div className="mid-left">
                <MdAddchart />
                <h3>BCH305</h3>
                <p>You have not marked yourself as present today.</p>
                <p className="time-left">
                  Time left : <span>56m 44s</span>
                </p>
              </div>
              <ProgressBar percent={18} />
            </div>
            {button.normal({ element: 'mark presence', name: 'cap' })}
          </section>
          <section className="right">
            <div className="info-field">
              <FaHistory style={{ color: color || 'var(--main-color)' }} />
              <span>Average Hours</span>
              <h3>7h 7mins</h3>
            </div>
            <div className="info-field">
              <FaHistory />
              <span>Arrival</span>
              <h3>98 %</h3>
            </div>
          </section>
        </div>
        <div className="s-dashboard-body-second">
          <section className="today-schedule left">
            <div className="top">
              <h3>My Attendance Overview</h3>
              {button.normal({ element: 'View Stats', name: 'stats' })}
            </div>
            <hr />
            <div className="mid">
              <div className="mid-left">
                {[
                  {
                    color: 'green',
                    figure: '1012',
                    text: 'present ( on time )',
                  },
                  { color: 'green', figure: '121', text: 'late' },
                  { color: 'red', figure: '21', text: 'absent' },
                  { color: 'red', figure: '21', text: 'other reasons' },
                ].map(({ text, figure, color }) => (
                  <div
                    className="stat"
                    key={text}>
                    <FaCircle color={`var(--${color})`} />{' '}
                    <p>
                      <b>{figure}</b> {text}
                    </p>
                  </div>
                ))}
              </div>
              <MultiSegmentProgressBar
                present={40}
                absent={30}
                late={15}
                others={10}
                medical={10}
                excused={5}
              />
            </div>
            <div className="encourage">
              <LuBookCheck />
              <p>
                Better than <b>91.3%</b> students
              </p>
            </div>
          </section>
          <section className="right">
            <div className="info-field">
              <FaHistory />
              <span>Average Hours</span>
              <h3>7h 7mins</h3>
            </div>
            <div className="info-field">
              <FaHistory />
              <span>Arrival</span>
              <h3>98 %</h3>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
