import HistoryCard from './HistoryCard';
import button from '../../../components/Button/Button';
import Spinner from '../../../components/Loader/Spinner/Spinner';

const AttendanceHistory = ({ history = [], loading = true, user = {} }) => {
  const mockHistory = [
    {
      date: 'Wed, Aug 14, 2023',
      time: '03:00 - 05:00',
      status: 'on-time',
      checkIn: '03:00',
      checkOut: '03:10',
      code: 'BCH315',
      location: 'Auditorium',
    },
    {
      date: 'Wed, Aug 15, 2023',
      time: '03:00 - 05:00',
      status: 'late',
      checkIn: '04:00',
      checkOut: '04:10',
      code: 'BCH305',
      location: 'Admin',
    },
    {
      date: 'Wed, Aug 13, 2023',
      time: '03:00 - 05:00',
      status: 'absent',
      checkIn: '03:00',
      checkOut: '03:10',
      code: 'BCH315',
      location: 'Auditorium',
    },
  ];

  return (
    <section className="s-attendance-history">
      <header className="heading">
        <span>Attendance History</span> <hr />
      </header>
      <div className="s-attendance-history-wrap">
        <div className="s-attendance-history-pagination cap">
          {button.normal({ element: 'prev', name: 'btn' })}
          <span>1</span>
          {button.normal({ element: 'next', name: 'btn' })}
        </div>
        <div className="s-attendance-history-cards">
          {loading ? (
            <div>
              <Spinner
                size="35px"
                borderWidth="2px"
              />
            </div>
          ) : !history ? (
            <p>No data</p>
          ) : (
            history
              .filter((h) =>
                h.studentRecords.some((r) => r.studentId === user._id)
              )
              .map((item, i) => {
                const student = item.studentRecords.find(
                  (r) => r.studentId === user._id
                );
                if (!student) return null; // extra safety

                const { status, checkIn, checkOut, code = 'None' } = student;

                return (
                  <HistoryCard
                    key={i}
                    date={item.classDate}
                    time={item.classTime}
                    status={status}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    code={code}
                    location={item.location?.latitude} // fixed typo
                  />
                );
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default AttendanceHistory;
