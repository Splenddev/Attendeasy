import styles from '../ScheduleHistory.module.css';

export default function AttendanceModal({ studentPresence, date, onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>Attendance – {new Date(date).toDateString()}</h2>
        <button
          onClick={onClose}
          className={styles.closeBtn}>
          ✖
        </button>
        <div className={styles.attendanceGroups}>
          {['present', 'late', 'absent'].map((status) => (
            <div key={status}>
              <h4>
                {status.toUpperCase()} (
                {studentPresence.filter((s) => s.status === status).length})
              </h4>
              <ul>
                {studentPresence
                  .filter((s) => s.status === status)
                  .map((s) => (
                    <li key={s.studentId}>{s.studentId}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
