import AttendanceCard from './AttendanceCard';

const TodayAttendance = ({ data }) => {
  return (
    <section className="s-attendance-today">
      <header>
        Today's <hr />
      </header>
      <div className="today-attendance-cards">
        {data.length <= 0 ? (
          <p className="no-class">No attendance today</p>
        ) : (
          data.map((att, i) => (
            <AttendanceCard
              key={i}
              att={att}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TodayAttendance;
