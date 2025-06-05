import { useState } from 'react';
import AttendanceCard from './AttendanceCard';

const TodayAttendance = ({ data }) => {
  const [markEntryModal, setMarkEntryModal] = useState(false);
  return (
    <section className="s-attendance-today">
      <header className="heading">
        Today's <hr />
      </header>
      <div className="today-attendance-cards">
        {data.length <= 0 ? (
          <p className="no-class">No attendance today</p>
        ) : (
          data.map((att, i) => (
            <AttendanceCard
              isModal={markEntryModal}
              setIsModal={setMarkEntryModal}
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
