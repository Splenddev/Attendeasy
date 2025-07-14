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
import { useFetchGroupAttendances } from '../../../hooks/useAttendance';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const [markEntryModal, setMarkEntryModal] = useState({
    visible: false,
    maxRange: 0,
    attendanceId: '',
    mode: '',
    location: { lat: 0, lng: 0 },
  });
  const [history, setHistory] = useState(attendance);

  const { data, loading, fetch, error } = useFetchGroupAttendances(user.group);

  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);

  useEffect(() => {
    fetch();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = data.filter((att) => {
    const attDate = new Date(att.classDate);
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

  return (
    <div className="s-attendance">
      <AttendanceInfo
        user={user}
        date={dateFormatter(null)}
        data={summary}
      />

      {smartTip && <p className="smart-tip">{smartTip}</p>}

      <TodayAttendance
        data={filtered}
        markEntryModal={markEntryModal}
        setMarkEntryModal={setMarkEntryModal}
        user={user}
      />

      <AttendanceCharts summary={summary} />

      <AttendanceHistory
        history={data}
        loading={loading}
        user={user}
      />
      {markEntryModal.visible && (
        <div className="modal-wrap">
          <MarkEntry
            onClose={setMarkEntryModal}
            visible={markEntryModal.visible}
            maxDistance={markEntryModal.maxRange}
            attendanceId={markEntryModal.attendanceId}
            mode={markEntryModal.mode}
            classLocation={markEntryModal.location}
          />
        </div>
      )}
      <UpcomingSchedule schedules={getTodaySchedule(scheduleJson)} />

      {/* <SuccessModal
        isOpen={showSuccess}
        data={successData}
        onClose={() => setShowSuccess(false)}
      /> */}
    </div>
  );
};
export default StudentAttendance;
