import { MdAddchart, MdChat, MdSend, MdTimelapse } from 'react-icons/md';
import { useAuth } from '../../../context/AuthContext';
import {
  dateFormatter,
  getGreeting,
  parseDuration,
  parseTime2,
  timeFormatter,
  truncateText,
} from '../../../utils/helpers';
import './StudentDashboard.css';
import button from '../../../components/Button/Button';
import { FaCircle, FaFileAlt, FaHistory } from 'react-icons/fa';
import { AiFillFilePdf } from 'react-icons/ai';
import { FiDownload, FiRefreshCcw } from 'react-icons/fi';
import { HiDocumentText } from 'react-icons/hi';
import ProgressBar from './ProgressBar/ProgressBar';
import { LuBookCheck, LuClock } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchGroupAttendances } from '../../../hooks/useAttendance';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import OngoingSession from './components/OngoingSession/OngoingSession';
import EmptyState from '../../../components/EmptyState/EmptyState';

function checkIfDeadlinePassed(classStartUTC, graceDuration = '0H10M') {
  const now = new Date();
  const deadline = new Date(classStartUTC);
  const deltaMinutes = parseDuration(graceDuration);
  deadline.setMinutes(deadline.getMinutes() + deltaMinutes);
  return now > deadline;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const {
    data = [],
    fetch,
    loading: isFetchingRecords,
  } = useFetchGroupAttendances();

  useEffect(() => {
    fetch(user.group);
  }, []);

  const upcoming = data.filter((att) => att.status === 'upcoming') || [];
  const ongoing = data.filter((att) => att.status === 'active') || [];
  const session =
    ongoing
      .map((att) => ({
        ...att,
        myRecord: att.studentRecords.find((st) => st.studentId === user._id),
      }))
      .filter((att) => att.myRecord) || [];

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
          <h3
            className="cap"
            onClick={() => console.log(session)}>
            {getGreeting()}, {user.name}
          </h3>
          {isFetchingRecords ? (
            <Spinner
              size="15px"
              borderWidth="1px"
            />
          ) : (
            <span>
              {upcoming.length === 0 && ongoing.length === 0 ? (
                'You have no upcoming or ongoing attendance.'
              ) : (
                <>
                  You have{' '}
                  {upcoming.length > 0 && (
                    <>
                      <b>{upcoming.length}</b> upcoming
                      {upcoming.length > 1 ? ' sessions' : ' session'}
                    </>
                  )}
                  {upcoming.length > 0 && ongoing.length > 0 && ' and '}
                  {ongoing.length > 0 && (
                    <>
                      <b>{ongoing.length}</b> ongoing
                      {ongoing.length > 1 ? ' sessions' : ' session'}
                    </>
                  )}
                  .
                </>
              )}
            </span>
          )}

          <br />
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
          <section className="today-schedule left attendance">
            <div className="today-session ">
              {session.length === 0 ? (
                <EmptyState
                  title="No Ongoing Sessions"
                  subtitle="There are no active classes right now. Please check back later or contact your class rep for details."
                  icon={LuClock}
                  action={
                    <button
                      onClick={() => fetch(user.group)}
                      className="default_button mixed">
                      <FiRefreshCcw
                        className={isFetchingRecords ? 'spin' : ''}
                      />
                      Refresh
                    </button>
                  }
                />
              ) : (
                session.map((s) => {
                  const deadlinePassed = checkIfDeadlinePassed(
                    s.classTime.utcStart,
                    s.settings.checkInCloseTime
                  );

                  const entryStart = parseTime2(
                    s.classTime?.start,
                    s.entry?.start
                  );
                  const entryEnd = parseTime2(entryStart, s.entry?.end);

                  const offsets = {
                    checkInCloseTime: s.settings.checkInCloseTime,
                    others: '0H10M',
                  };
                  const entry = { start: entryStart, end: entryEnd };

                  return (
                    <OngoingSession
                      session={s}
                      deadlinePassed={deadlinePassed}
                      timeData={{ offsets, entry }}
                    />
                  );
                })
              )}
            </div>
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
          <section className="today-schedule left analytics">
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
