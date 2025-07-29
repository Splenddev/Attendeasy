import React from 'react';
import {
  FiDownloadCloud,
  FiClock,
  FiUserCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import Spinner from '../../../../../components/Loader/Spinner/Spinner';
import styles from './AttendanceTab.module.css';

const getRateClass = (rate) => {
  const r = parseFloat(rate);
  return r >= 80 ? 'good' : r >= 50 ? 'mid' : 'low';
};

const AttendanceTab = ({ isClassRep, data, error, loading, retry }) => {
  if (loading) return <Spinner size="28px" />;
  if (error)
    return (
      <div className={styles.stateMessage}>
        <p>{error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  if (!data)
    return <p className={styles.stateMessage}>No attendance data yet.</p>;

  const { summary, recentSessions, topAbsentees, pleaRequests, exportOptions } =
    data;

  return (
    <div className={styles.tabWrapper}>
      <button
        className={styles.refetchAll}
        onClick={retry}>
        Refetch all data
      </button>
      {/* Summary Stats */}
      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span>Total Sessions</span>
          <h2>{summary.totalSessions}</h2>
        </div>
        <div className={styles.statCard}>
          <span>Average Attendance</span>
          <h2>{summary.avgAttendanceRate}%</h2>
        </div>
        <div className={styles.statCard}>
          <span>Marked Records</span>
          <h2>{summary.totalMarked}</h2>
        </div>
        <div className={styles.statCard}>
          <span>Total Absences</span>
          <h2>{summary.totalAbsent}</h2>
        </div>
      </div>

      {/* Active Session */}
      {summary.activeSession?.isActive && (
        <div className={styles.activeSession}>
          <div className={styles.activeSessionContent}>
            <div className={styles.activeSessionHeader}>
              <FiClock size={20} /> Ongoing Attendance
            </div>
            <div className={styles.activeSessionTime}>
              <div>
                <strong>Time:</strong> {summary.activeSession.startTime}–
                {summary.activeSession.endTime}
              </div>
              <div>
                <strong>Marked:</strong> {summary.activeSession.studentsMarked}/
                {summary.activeSession.studentsAllowed}
              </div>
            </div>
            <div className={styles.activeSessionProgress}>
              <div
                className={styles.activeSessionBar}
                style={{
                  width: `${
                    (summary.activeSession.studentsMarked /
                      summary.activeSession.studentsAllowed) *
                      100 || 0
                  }%`,
                }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Recent Sessions</h3>
        </div>
        {recentSessions.length ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>Marked</th>
                  {/* <th>Present</th> */}
                  <th>Marked</th>
                  <th>Late</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.attendanceId}>
                    <td>{session.date}</td>
                    <td>{session.topic}</td>
                    <td>{session.marked}</td>
                    {/* <td>{session.present || 0}</td> */}
                    <td>{session.late}</td>
                    <td>{session.absent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.muted}>No recent sessions yet.</p>
        )}
      </div>

      {/* Top Absentees */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <FiAlertCircle size={18} />
          <h3>Top Absentees</h3>
        </div>
        {topAbsentees.length ? (
          <ul className={styles.absentees}>
            {topAbsentees.map((s) => (
              <li key={s.studentId}>
                <div className={styles.name}>
                  <span className={styles.avatar}>{s.name[0]}</span> {s.name}
                </div>

                <div className={styles.stats}>
                  <span>{s.absences} absences</span>
                  <span>{s.lateMarks} late</span>
                  <span
                    className={`${styles.rate} ${
                      styles[getRateClass(s.attendanceRate)]
                    }`}>
                    {s.attendanceRate}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.muted}>No notable absentees.</p>
        )}
      </div>

      {/* Absence Pleas */}
      {pleaRequests.length > 0 && isClassRep && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiUserCheck size={18} />
            <h3>Absence Pleas</h3>
          </div>
          <ul className={styles.pleas}>
            {pleaRequests.map((plea) => (
              <li key={plea.pleaId}>
                <div className={styles.pleaInfo}>
                  <div className={styles.pleaName}>{plea.name}</div>
                  <div className={styles.pleaDate}>{plea.date}</div>
                </div>
                <span className={`${styles.status} ${styles[plea.status]}`}>
                  {plea.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Export Options */}
      {exportOptions?.available && isClassRep && (
        <div className={styles.export}>
          {exportOptions.formats.map((format) => (
            <a
              key={format}
              href={`${exportOptions.downloadLink}?format=${format}`}
              className={`${styles.exportBtn} ${styles[format]}`}
              download>
              <FiDownloadCloud size={16} />
              Export {format.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceTab;
