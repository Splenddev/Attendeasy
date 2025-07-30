import React, { useEffect, useState } from 'react';
import { MdCalendarToday, MdMessage, MdPhoneInTalk } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import button from '../../../components/Button/Button';
import api from '../../../services/api';
import { LuMailPlus } from 'react-icons/lu';

const AttendanceInfo = ({ att = [], date, groupId, studentId, fetching }) => {
  const [rep, setRep] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({ rep: true, summary: true });

  const [summary, setSummary] = useState({
    onTime: '-%',
    late: '-%',
    absent: '-%',
    other: '-%',
  });

  const repId = att?.[0]?.createdBy;

  // Fetch Class Rep Info
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
        setLoading((prev) => ({ ...prev, rep: false }));
      }
    };
    fetchRep();
  }, [repId]);

  // Fetch Student Attendance Summary
  useEffect(() => {
    const fetchSummary = async () => {
      if (!studentId || !groupId) return;
      try {
        const res = await api.get(`attendance/students/${studentId}/summary`);
        const stat = res.data?.statusSummary || {};
        setSummary({
          onTime: stat.onTime || '0%',
          late: stat.late || '0%',
          absent: stat.absent || '0%',
          other: stat.other || '0%',
        });
      } catch (err) {
        console.error('Failed to fetch attendance summary:', err);
      } finally {
        setLoading((prev) => ({ ...prev, summary: false }));
      }
    };
    fetchSummary();
  }, [studentId, groupId]);

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
              <span>{summary.onTime}</span>
            </li>
            <li>
              <FaCircle className="late" /> <b className="cap">late</b>{' '}
              <span>{summary.late}</span>
            </li>
            <li>
              <FaCircle className="absent" /> <b className="cap">absent</b>{' '}
              <span>{summary.absent}</span>
            </li>
            <li>
              <FaCircle className="others" /> <b className="cap">others</b>{' '}
              <span>{summary.other}</span>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="s-attendance-info-right">
          <div className="s-attendance-info-class-rep">
            <div className="profile">
              {loading.rep || fetching
                ? '...'
                : rep?.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div className="cred">
              {loading.rep || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '150px', height: '20px' }}
                />
              ) : (
                <h3 className="cap">{rep?.name}</h3>
              )}
              {loading.rep || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '100px', height: '16px' }}
                />
              ) : (
                <p className="cap">{rep?.role || 'class-rep'}</p>
              )}
              {loading.rep || fetching ? (
                <div
                  className="skeleton skeleton-text"
                  style={{ width: '120px', height: '14px' }}
                />
              ) : (
                <p>{rep?.email || 'No email'}</p>
              )}
              <div className="btn">
                {button.icon({ icon: MdPhoneInTalk, label: 'reps contact' })}
                {button.icon({ icon: LuMailPlus, label: 'message rep' })}
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
                {loading.rep || fetching ? (
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: '120px', height: '14px' }}
                  />
                ) : (
                  <h2>{card?.value || 0}</h2>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceInfo;
