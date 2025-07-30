import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  dateFormatter,
  getTodaySchedule,
  generateSmartTip,
} from '../../../utils/helpers';
import './StudentAttendance.css';

import AttendanceInfo from './AttendanceInfo';
import TodayAttendance from './TodayAttendance';
import AttendanceHistory from './AttendanceHistory';
import MarkEntry from '../../../components/Modals/MarkEntry/MarkEntry';
import AttendanceCharts from './AttendanceCharts';
import UpcomingSchedule from './UpcomingSchedule';

import { useFetchGroupAttendances } from '../../../hooks/useAttendance';
import useAttendanceSocket from '../../../hooks/useAttendanceSocket';
import { toast } from 'react-toastify';
import { scheduleJson } from '../../ClassRep/ClassSchedule/assets';

const StudentAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const [markEntryModal, setMarkEntryModal] = useState({
    visible: false,
    maxRange: 0,
    attendanceId: '',
    mode: '',
    location: { lat: 0, lng: 0 },
  });

  const [statusPreference, setStatusPreference] = useState('all');

  const groupId = user.group;
  const userIdRef = useRef(user._id);

  useEffect(() => {
    userIdRef.current = user._id;
  }, [user._id]);

  const { data, loading, fetch } = useFetchGroupAttendances(groupId);

  useAttendanceSocket(groupId, {
    onUpdate: () => {
      console.log('⚡ attendance:update received');
      fetch();
    },
    onProgress: (data) => {
      fetch();
      if (data?.studentId !== user._id) {
        toast.info(`${data?.studentName} just checked in`);
      }
    },
    onFlagged: (data) => {
      if (data?.studentId === user._id) {
        toast.warn('⚠️ Your attendance was flagged. Please check.');
      }
    },
    onDeleted: (data) => {
      toast.error(`🚫 Attendance deleted for ${data.classDate}`);
      fetch(user.group); // optionally refetch
    },
    onClosed: (data) => {
      toast.error(`🚫 Attendance deleted for ${data.classDate}`);
      fetch(user.group); // optionally refetch
    },
    onReopened: (data) => {
      toast.info(
        `🔁 Attendance reopened for ${data.courseCode} on ${data.classDate}`
      );
      fetch(user.group);
    },
  });

  useEffect(() => {
    setNavTitle('My Attendance');
  }, [setNavTitle]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const filtered = useMemo(() => {
    return data.filter((att) => {
      if (!att.classDate) return false;

      const attDate = new Date(att.classDate).toDateString();
      const todayDate = today.toDateString();

      const isToday = attDate === todayDate;
      if (!isToday) return false;

      if (statusPreference === 'all') {
        return true;
      }

      return att.status === statusPreference;
    });
  }, [data, today, statusPreference]);

  const summary = {
    onTime: 80,
    late: 10,
    absent: 10,
  };

  const smartTip = useMemo(() => generateSmartTip(data), [data]);

  return (
    <div className="s-attendance">
      <AttendanceInfo
        user={user}
        date={dateFormatter(null)}
        studentId={user._id}
        groupId={user.group}
        att={data}
        fetching={loading}
      />

      {smartTip && <p className="smart-tip">{smartTip}</p>}

      <TodayAttendance
        data={filtered}
        markEntryModal={markEntryModal}
        setMarkEntryModal={setMarkEntryModal}
        user={user}
        loading={loading}
        preference={statusPreference}
        setPreference={setStatusPreference}
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
    </div>
  );
};

export default StudentAttendance;
