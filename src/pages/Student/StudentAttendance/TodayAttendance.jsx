import TodayAttendanceCard from '../../../components/Skeletons/TodayAttendanceCard/TodayAttendanceCard';
import AttendanceCard from './AttendanceCard';

const TodayAttendance = ({
  data,
  markEntryModal,
  setMarkEntryModal,
  user,
  loading,
  preference = 'active',
  setPreference,
}) => {
  const filters = ['all', 'closed', 'active'];
  return (
    <section className="s-attendance-today">
      <header className="heading">
        Today's <hr />
      </header>
      <ul className="s-attendance-today-filter">
        {filters.map((status) => (
          <li
            key={status}
            className={preference === status ? 'active' : ''}
            onClick={() => setPreference(status)}>
            {status}
          </li>
        ))}
      </ul>
      <div className="today-attendance-cards">
        {loading ? (
          <TodayAttendanceCard />
        ) : data.length <= 0 ? (
          <p className="no-class">
            No {preference === 'all' ? '' : preference} attendance today
          </p>
        ) : (
          data.map((att, i) => {
            const student = att.studentRecords.find(
              (r) => r.studentId === user._id
            );
            return (
              <AttendanceCard
                isModal={markEntryModal}
                setIsModal={setMarkEntryModal}
                key={i}
                att={att}
                student={student}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default TodayAttendance;
