import HistoryCard from './HistoryCard';
import button from '../../../components/Button/Button';
import Spinner from '../../../components/Loader/Spinner/Spinner';

const AttendanceHistory = ({ history = [], loading = true, user = {} }) => {
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
              .sort((a, b) => {
                const aDateTime = new Date(
                  `${a.classDate}T${a.classTime?.start ?? '00:00'}`
                );
                const bDateTime = new Date(
                  `${b.classDate}T${b.classTime?.start ?? '00:00'}`
                );

                return bDateTime.getTime() - aDateTime.getTime(); // descending
              })
              .map((item, i) => {
                const student = item.studentRecords.find(
                  (r) => r.studentId === user._id
                );
                if (!student) return null; // extra safety

                const {
                  finalStatus,
                  checkIn,
                  checkOut,
                  code = 'None',
                  checkInStatus,
                  checkOutStatus,
                } = student;

                return (
                  <HistoryCard
                    key={i}
                    date={item.classDate}
                    time={item.classTime}
                    status={finalStatus}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    code={code}
                    checkInStatus={checkInStatus}
                    checkOutStatus={checkOutStatus}
                    location={item.location?.latitude}
                    attStatus={item.status}
                    courseCode={item.courseCode}
                    courseTitle={item.courseTitle}
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
