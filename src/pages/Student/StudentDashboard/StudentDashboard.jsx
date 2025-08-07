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
import {
  FiBarChart,
  FiBarChart2,
  FiDownload,
  FiRefreshCcw,
} from 'react-icons/fi';
import { HiDocumentText } from 'react-icons/hi';
import {
  LuBookCheck,
  LuBookOpen,
  LuCalendarClock,
  LuClock,
  LuClock4,
  LuFlame,
  LuHourglass,
  LuSchool,
  LuTarget,
} from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchGroupAttendances } from '../../../hooks/useAttendance';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import OngoingSession from './components/OngoingSession/OngoingSession';
import EmptyState from '../../../components/EmptyState/EmptyState';
import Stats from './components/Stats/Stats';

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
    { figure: '101', text: 'present ( on time )' },
    { figure: '121', text: 'late' },
    { figure: '21', text: 'absent' },
    { figure: '21', text: 'other reasons' },
  ];
  let total = overview.reduce((sum, item) => sum + parseFloat(item.figure), 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const testStat = [
    {
      icon: LuSchool,
      label: 'Total Courses Enrolled',
      value: 5,
      maxValue: 10,
      description: 'All courses you’re currently signed up for.',
    },
    {
      icon: LuTarget,
      label: 'Courses Completed',
      value: 1,
      maxValue: 5,
      description: 'Number of courses you’ve successfully finished.',
      subtext: '20% of total courses',
    },
    {
      icon: FiBarChart2,
      label: 'Completion Rate',
      value: 20,
      maxValue: 100,
      unit: '%',
      description: 'How much of your total enrolled courses are completed.',
    },
    {
      icon: LuBookOpen,
      label: 'Courses In Progress',
      value: 4,
      maxValue: 5,
      description: 'Courses you are currently working on.',
    },
    {
      icon: LuHourglass,
      label: 'Total Hours Spent',
      value: 90,
      maxValue: 150,
      unit: 'h',
      description: 'Cumulative time invested in all courses.',
      subtext: 'Avg: 18h per course',
    },
    {
      icon: LuClock4,
      label: 'Avg. Hours per Course',
      value: (90 / 5).toFixed(1),
      maxValue: 40,
      unit: 'h',
      description: 'Average time spent per course so far.',
    },
    {
      icon: LuCalendarClock,
      label: 'Estimated Time Left',
      value: 60,
      maxValue: 150,
      unit: 'h',
      description: 'Based on unfinished courses and average pace.',
    },
    {
      icon: LuFlame,
      label: 'Learning Streak',
      value: 12,
      maxValue: 30,
      unit: 'd',
      description: 'Consecutive days you’ve engaged in learning.',
      subtext: 'Keep it going!',
    },
  ];

  return (
    <div className="s-dashboard">
      {/* Header Section */}
      <header className="s-dashboard-header">
        <section>
          <h3
            className="cap"
            onClick={() => console.log(session)}>
            {getGreeting()}, {user.name}
          </h3>
          {isFetchingRecords ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner
                size="15px"
                borderWidth="1px"
              />
              <span>Loading your schedule...</span>
            </div>
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
        {/* First Section - Ongoing Sessions and Stats */}
        <section className="dashboard-section first-section">
          {/* Ongoing Sessions */}
          <div className="left-pane">
            <div className="today-schedule left attendance">
              <div
                className={`today-session ${session.length === 0 && 'center'}`}>
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
                        key={s._id}
                        session={s}
                        deadlinePassed={deadlinePassed}
                        timeData={{ offsets, entry }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Stats and Quick Actions */}
          <div className="middle-right-wrapper">
            {/* Statistics Cards */}
            <div className="middle-pane">
              {testStat.map((stat, index) => {
                const { icon: Icon, label, value, unit, maxValue } = stat;
                return (
                  <div
                    key={index}
                    className="stats-container">
                    <div className="icon">
                      <Icon size={'1.3rem'} />
                    </div>
                    <div className="text">{label}</div>
                    <Stats
                      progressBarValue={value}
                      text={label}
                      progressBarProps={{
                        maxValue,
                        textSize: 25,
                        displayMode: 'onlyValue',
                        unit: unit || '',
                        size: 55,
                        strokeWidth: 10,
                        colorMap: {
                          poor: 'var(--danger-color)',
                          average: 'var(--warning-color)',
                          good: 'var(--accent-color)',
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="right-pane">
              <div className="info-field">
                <MdChat />
                <span>Send a message to class rep</span>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button disabled={message === ''}>
                  <MdSend />
                  Send
                </button>
              </div>

              <div className="info-field">
                <FaFileAlt />
                <span>Course Materials</span>
                <div className="truncate">
                  <AiFillFilePdf />
                  <strong>
                    {truncateText(
                      'BCH305 - intro to practical biochemistry',
                      30
                    )}
                  </strong>
                  <FiDownload />
                </div>
                <button>View all</button>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section - Analytics and Upcoming */}
        <section className="dashboard-section second-section">
          {/* Attendance Analytics */}
          <div className="left-pane">
            <div className="today-schedule left analytics">
              <div className="top">
                <h3>My Attendance</h3>
                <button
                  onClick={() => navigate(`/${user.role}/attendance`)}
                  className="view-stats-btn">
                  View Full Stats
                </button>
              </div>
              <hr />
              <div className="mid">
                <div className="mid-left">
                  {overview.map(({ text, figure }, index) => (
                    <div
                      key={index}
                      className="stats-container">
                      <div className="text">{text}</div>
                      <Stats
                        value={figure}
                        progressBarValue={(figure / total) * 100}
                        maxValue={total}
                        text={text}
                        showValue
                        progressBarProps={{ size: 50, strokeWidth: 10 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="encourage">
                <LuBookCheck />
                <p>
                  Better than <b>91.3%</b> students
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Upcoming Classes and Assignments */}
          <div className="right-pane">
            <div className="info-field">
              <FaHistory />
              <span>Upcoming Classes</span>
              <h3>BCH305</h3>
              <button>View all</button>
            </div>

            <div className="info-field">
              <HiDocumentText />
              <span>Assignments</span>
              <h3>2 Assignments</h3>
              <button>View all</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
