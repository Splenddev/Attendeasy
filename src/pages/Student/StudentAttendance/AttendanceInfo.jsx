import React, { useEffect, useState } from 'react';
import { MdCalendarToday, MdMessage, MdPhoneInTalk } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import button from '../../../components/Button/Button';
import api from '../../../services/api';

const AttendanceInfo = ({
  att = [],
  date,
  data = { onTime: '-%', late: '-%', absent: '-%' },
  fetching,
}) => {
  const [rep, setRep] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const repId = att?.[0]?.createdBy;
  // Fetch rep info
  useEffect(() => {
    if (!repId) return;
    const fetchRep = async () => {
      try {
        const res = await api.get(`auth/${repId}`);
        setRep(res.data.user);
        setStats(res.data.stats);
      } catch (err) {
        console.error('Failed to fetch class rep info', err);
      } finally {
        setLoading(false);
      }
    };

    if (repId) {
      fetchRep();
    } else {
      setLoading(false);
    }
  }, [repId]);

  return (
    <section className="s-attendance-heading">
      <h1>My Attendance</h1>
      <div className="s-attendance-info">
        {/* LEFT SECTION */}
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

        {/* RIGHT SECTION */}
        <div className="s-attendance-info-right">
          <div className="s-attendance-info-class-rep">
            <div className="profile">
              {loading || fetching
                ? '...'
                : rep?.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div className="cred">
              {loading || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '150px', height: '20px' }}
                />
              ) : (
                <h3 className="cap">{rep?.name}</h3>
              )}
              {loading || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '100px', height: '16px' }}
                />
              ) : (
                <p className="cap">{rep?.role || 'class-rep'}</p>
              )}
              {loading || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '120px', height: '14px' }}
                />
              ) : (
                <p>{rep?.email || 'No email'}</p>
              )}
              <div className="btn">
                {button.icon({ icon: MdPhoneInTalk, label: 'reps contact' })}
                {button.icon({ icon: MdMessage, label: 'message rep' })}
              </div>
            </div>
          </div>

          {/* Mini Cards */}
          <div className="class-rep-mini-cards">
            {[
              { title: 'total attendance', value: stats?.attendanceCount },
              { title: 'total schedules', value: stats?.scheduleCount },
            ].map((card) => (
              <div
                key={card.title}
                className="card">
                <p className="cap">{card.title}</p>
                {loading || fetching ? (
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: '120px', height: '14px' }}
                  />
                ) : (
                  <h2>{card?.value || 0}</h2>
                )}{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceInfo;
