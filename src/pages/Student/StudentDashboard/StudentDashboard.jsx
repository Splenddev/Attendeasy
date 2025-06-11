import { MdAddchart, MdChat, MdSend, MdTimelapse } from 'react-icons/md';
import { useAuth } from '../../../context/AuthContext';
import {
  dateFormatter,
  timeFormatter,
  truncateText,
} from '../../../utils/helpers';
import './StudentDashboard.css';
import button from '../../../components/Button/Button';
import { FaCircle, FaFileAlt, FaHistory } from 'react-icons/fa';
import { AiFillFilePdf } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { HiDocumentText } from 'react-icons/hi';
import ProgressBar from './ProgressBar/ProgressBar';
import { LuBookCheck } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const overview = [
    {
      figure: '101',
      text: 'present ( on time )',
    },
    { figure: '121', text: 'late' },
    { figure: '21', text: 'absent' },
    { figure: '21', text: 'other reasons' },
  ];
  let total = 0;
  overview.forEach((o) => {
    total += parseFloat(o.figure);
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="s-dashboard">
      <header className="s-dashboard-header">
        <section>
          <p className="cap">Good Morning, {user.name}</p>
          <span>
            You have <b>2</b> upcoming schedules and <b>1</b> attendance
          </span>
        </section>
        <section className="curr-date">
          <div>
            <p>Current date</p>
            <span>
              {dateFormatter(now)} {timeFormatter(now, 'en-GB', true)}
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
              <ProgressBar
                text
                percent={18}
                styled
              />
            </div>
            {button.normal({ element: 'mark presence', name: 'cap' })}
          </section>
          <section className="right">
            <div className="info-field">
              <MdChat />
              <span>Send a message to class rep</span>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {button.multiple({
                icon: MdSend,
                element: 'Send',
                disabled: message === '',
              })}
            </div>
            <div className="info-field">
              <FaFileAlt />
              <span>Course Materials</span>
              <p className="truncate">
                <AiFillFilePdf color="red" />
                <strong>
                  {truncateText('BCH305 - intro to practical biochemistry', 30)}
                </strong>
                <FiDownload />
              </p>
              {button.normal({
                element: 'view all',
              })}
            </div>
          </section>
        </div>
        <div className="s-dashboard-body-second">
          <section className="today-schedule left">
            <div className="top">
              <h3>My Attendance</h3>
              {button.normal({
                element: 'View Full Stats',
                name: 'view-stats',
                func: () => navigate(`/${user.role}/attendance`),
              })}
            </div>
            <hr />
            <div className="mid">
              <div className="mid-left">
                {overview.map(({ text, figure }) => {
                  return (
                    <div
                      className="stat"
                      key={text}>
                      <FaCircle
                        color={`var(--${
                          text.includes('on time')
                            ? 'on-time'
                            : text.includes('other')
                            ? 'others'
                            : text
                        })`}
                      />{' '}
                      <p>
                        <b>{figure}</b> {text}
                      </p>
                      <ProgressBar
                        strokeWidth={10}
                        size={30}
                        percent={(figure / total) * 100}
                      />
                    </div>
                  );
                })}
              </div>
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
              <span>Upcoming Classes</span>
              <h3>BCH305</h3>
              {button.normal({
                element: 'view all',
              })}
            </div>
            <div className="info-field">
              <HiDocumentText />
              <span>Assignments</span>
              <h3>2 Assignments</h3>
              {button.normal({
                element: 'view all',
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
