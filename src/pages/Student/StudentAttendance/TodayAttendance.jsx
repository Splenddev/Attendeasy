import AttendanceCard from './AttendanceCard';

const TodayAttendance = ({ data, markEntryModal, setMarkEntryModal, user }) => {
  return (
    <section className="s-attendance-today">
      <header className="heading">
        Today's <hr />
      </header>
      <div className="today-attendance-cards">
        {data.length <= 0 ? (
          <p className="no-class">No attendance today</p>
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
