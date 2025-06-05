import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { attendance } from '../../../assets/assets';
import { dateFormatter } from '../../../utils/helpers';
import './StudentAttendance.css';

import AttendanceInfo from './AttendanceInfo';
import TodayAttendance from './TodayAttendance';
import AttendanceHistory from './AttendanceHistory';
import MarkEntry from '../../../components/Modals/MarkEntry/MarkEntry';
import { useState } from 'react';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const [markEntryModal, setMarkEntryModal] = useState(false);
  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = attendance.filter((att) => {
    const attDate = new Date(att.DateCreated);
    attDate.setHours(0, 0, 0, 0);
    return attDate.getTime() === today.getTime();
  });

  return (
    <div className="s-attendance">
      <AttendanceInfo
        user={user}
        date={dateFormatter(null)}
      />
      <TodayAttendance
        data={filtered}
        markEntryModal={markEntryModal}
        setMarkEntryModal={setMarkEntryModal}
      />
      <AttendanceHistory />
      {markEntryModal && (
        <div className="modal-wrap">
          <MarkEntry onClose={setMarkEntryModal} />
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
