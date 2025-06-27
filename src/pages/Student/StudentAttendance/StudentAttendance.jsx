import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { attendance } from '../../../assets/assets';
import { dateFormatter, getTodaySchedule } from '../../../utils/helpers';
import './StudentAttendance.css';

import AttendanceInfo from './AttendanceInfo';
import TodayAttendance from './TodayAttendance';
import AttendanceHistory from './AttendanceHistory';
import MarkEntry from '../../../components/Modals/MarkEntry/MarkEntry';
import { useState } from 'react';
import AttendanceCharts from './AttendanceCharts';
import { scheduleJson } from '../../ClassRep/ClassSchedule/assets';
import UpcomingSchedule from './UpcomingSchedule';
import { generateSmartTip } from '../../../utils/helpers';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const [markEntryModal, setMarkEntryModal] = useState(false);
  const [history, setHistory] = useState(attendance); // Or fetch from API

  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = history.filter((att) => {
    const attDate = new Date(att.DateCreated);
    attDate.setHours(0, 0, 0, 0);
    return attDate.getTime() === today.getTime();
  });

  const summary = {
    onTime: 80,
    late: 10,
    absent: 10,
  };

  const smartTip = generateSmartTip(history);

  const todays = getTodaySchedule(scheduleJson);
  console.log(todays);

  return (
    <div className="s-attendance">
      <AttendanceInfo
        user={user}
        date={dateFormatter(null)}
        data={summary}
      />

      {smartTip && <p className="smart-tip">{smartTip}</p>}

      <AttendanceCharts summary={summary} />

      <TodayAttendance
        data={filtered}
        markEntryModal={markEntryModal}
        setMarkEntryModal={setMarkEntryModal}
      />

      <AttendanceHistory data={history} />
      {markEntryModal && (
        <div className="modal-wrap">
          <MarkEntry
            onClose={setMarkEntryModal}
            visible={markEntryModal}
          />
        </div>
      )}
      <UpcomingSchedule schedules={getTodaySchedule(scheduleJson)} />
    </div>
  );
};
export default StudentAttendance;
