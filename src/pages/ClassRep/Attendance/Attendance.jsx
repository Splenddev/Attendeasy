import { useEffect, useMemo, useState } from 'react';
import './Attendance.css';

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { MdGridView } from 'react-icons/md';
import { RiGraduationCapFill } from 'react-icons/ri';
import {
  LuBookOpen,
  LuCalendarCheck2,
  LuClipboardCheck,
  LuDownload,
  LuListTodo,
  LuMailOpen,
} from 'react-icons/lu';
import { FaList, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DateFilter } from '../../../components';
import button from '../../../components/Button/Button';
import { timeFormatter } from '../../../utils/helpers';
import SessionInfo from './components/SessionInfo/SessionInfo';
import Students from './components/Students/Students';
import {
  useDeleteAttendance,
  useFetchGroupAttendances,
  useFinalizeAttendance,
  useReopenAttendance,
} from '../../../hooks/useAttendance';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import { FiLoader, FiTrash } from 'react-icons/fi';
import { useSuccessModal } from '../../../hooks/useSuccessModal';
import AttStatus from './components/AttStatus/AttStatus';
import useAttendanceSocket from '../../../hooks/useAttendanceSocket';
import { toast } from 'react-toastify';
import PopupBox from '../../../components/Modals/PopupBox/PopupBox';
import { ReopenSessionForm } from '../../../components/Forms';

const Attendance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const groupId = user?.group;

  const {
    data: attendanceList,
    fetch,
    loading,
    error,
  } = useFetchGroupAttendances(groupId);

  const { deleteAttendance, loading: deleting } = useDeleteAttendance();
  const { finalize, finalizing } = useFinalizeAttendance();
  const { reopen, opening } = useReopenAttendance();
  const { open: openSuccess } = useSuccessModal();
  const [openPopup, setOpenPopup] = useState(null);

  useEffect(() => {
    if (groupId) fetch(groupId);
  }, [groupId, fetch]);

  useAttendanceSocket(groupId, {
    onUpdate: () => {
      console.log('📡 Attendance updated');
      fetch(groupId);
    },
    onProgress: (data) => {
      fetch(groupId);
      if (data?.studentName && data?.status) {
        toast.success(`✅ ${data.studentName} marked as ${data.status}`);
      }
    },
    onFlagged: (data) => {
      if (data?.studentName) {
        toast.warning(`🚩 ${data.studentName}'s check-in was flagged`);
      }
    },
    onSummary: (summary) => {
      console.log('📊 Attendance summary update:', summary);
      // Optionally update charts, stats, or local state here
    },
    onDeleted: (data) => {
      console.log(data);
      toast.info(`🗑️ Attendance session deleted`);
      fetch(groupId); // re-fetch list after deletion
    },
    onReopened: (data) => {
      toast.success(`🔄 ${data.courseCode || 'A session'} was reopened`);
      fetch(groupId); // re-fetch list after reopen
    },
  });

  const handleReopen = async (id, data) => {
    const res = await reopen(id, data);
    if (res?.success) {
      setOpenPopup(null);
      openSuccess({
        title: 'Attendance Reopened',
        message: res.message,
        details: {
          AttendanceId: res.attendanceId,
        },
      });
    }
  };

  const handleFinalize = async (id) => {
    const res = await finalize(id);
    if (res?.success) {
      fetch(groupId);
      openSuccess({
        title: 'Attendance Finalized',
        message: res.message,
        details: {
          Present: res.stats.totalPresent,
          'On Time': res.stats.onTime,
          Late: res.stats.late,
          'Left Early': res.stats.leftEarly,
          Absent: res.stats.absent,
          'With Plea': res.stats.withPlea,
        },
      });
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteAttendance(id);
    if (res?.success) fetch(groupId);
  };

  const [filteredAttendance, setFilteredAttendance] = useState(attendanceList);
  const [course, setCourse] = useState('');
  const [marked, setMarked] = useState('');
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');

  const allCourses = useMemo(
    () => [...new Set(attendanceList.map((s) => s.courseCode).filter(Boolean))],
    [attendanceList]
  );

  const mapLetterToStatus = {
    P: ['on_time'],
    L: ['late', 'left_early'],
    A: ['absent', 'excused'],
    X: ['partial'],
  };

  const filteredByCourse = filteredAttendance.filter((s) =>
    course ? s.courseCode?.toLowerCase() === course.toLowerCase() : true
  );

  const sortedAttendance = filteredByCourse.sort(
    (a, b) => new Date(a.classDate) - new Date(b.classDate)
  );

  const groupStudents = (students = []) => {
    const filtered = students.filter((st) => {
      const matchesStatus =
        marked === '' || mapLetterToStatus[marked]?.includes(st.finalStatus);
      const matchesSearch =
        search === '' || st.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    if (view === 'list')
      return filtered
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((st) => ({
          id: st.studentId,
          letter: null,
          students: [st],
        }));

    return filtered
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((groups, st) => {
        const letter = st.name[0].toUpperCase();
        const grp = groups.find((g) => g.letter === letter);
        if (grp) grp.students.push(st);
        else groups.push({ id: letter, letter, students: [st] });
        return groups;
      }, []);
  };

  if (loading) {
    return (
      <div className="attendance-loading-state">
        <img
          src="/illustrations/loading.svg"
          alt="Loading attendance"
        />
        <div className="attendance-loading-content">
          <p>Fetching Attendance Records...</p>
          <Spinner size="32px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h4>Failed to load attendance data</h4>
        <p>{error}</p>
        <button onClick={() => fetch(groupId)}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="c-attendance">
        <div className="c-attendance-date">
          <DateFilter
            setFilteredAttendance={setFilteredAttendance}
            attendanceList={attendanceList}
          />
        </div>

        <div className="c-attendance-create">
          {button.multiple({
            icon: LuClipboardCheck,
            name: 'create-attendance-btn',
            element: 'New Attendance',
            func: () => navigate('/class-rep/attendance/create'),
          })}
        </div>

        <div className="c-attendance-filter">
          <div className="search_name">
            <input
              placeholder="Search a student name here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-icon-wrap">
              <FaSearch />
            </div>
          </div>

          <div className="filters">
            <div className="filter-wrap">
              <div>
                <RiGraduationCapFill />
                Course
              </div>
              <hr />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}>
                <option value="">All</option>
                {allCourses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="filter-wrap">
              <div>
                <LuListTodo />
                Marked
              </div>
              <hr />
              <select
                value={marked}
                onChange={(e) => setMarked(e.target.value)}>
                <option value="">All</option>
                <option value="L">Late / Early Leave</option>
                <option value="A">Absent / Excused</option>
                <option value="P">Present</option>
              </select>
            </div>

            <div className="c-attendance-view">
              <span
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}>
                <FaList />
              </span>
              <span
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}>
                <MdGridView />
              </span>
            </div>
          </div>
        </div>

        {attendanceList.length > 0 && (
          <p className="c-attendance-length">
            Filtered <span>{sortedAttendance.length}</span> of{' '}
            <span>{attendanceList.length}</span> attendance
          </p>
        )}

        {sortedAttendance.length === 0 ? (
          <div className="empty-attendance-state">
            <img
              src="/illustrations/create.svg"
              alt="No attendance sessions"
            />
            <h4>No attendance sessions yet</h4>
            <p>
              You haven’t created any attendance records for this selected date
              yet.
            </p>
            <button onClick={() => navigate('create')}>Create</button>
          </div>
        ) : (
          sortedAttendance.map((session) => (
            <AnimatePresence key={session.attendanceId}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="c-attendance-session">
                <div className="c-attendance-info">
                  <SessionInfo session={session} />
                  <section className="action">
                    <button className="time">
                      <LuMailOpen /> <span>Submit to lecturer</span>
                    </button>
                    <button className="time">
                      <LuDownload />
                    </button>
                    {session.status !== 'closed' &&
                      button.multiple({
                        icon: LuCalendarCheck2,
                        element: finalizing ? (
                          <Spinner size="20px" />
                        ) : (
                          'Finalize'
                        ),
                        func: () => handleFinalize(session._id),
                      })}
                    {session.status === 'closed' &&
                      button.multiple({
                        icon: opening ? FiLoader : LuBookOpen,
                        element: opening ? '' : 'Reopen Session',
                        loader: opening,
                        func: () => setOpenPopup(session._id),
                      })}
                    {button.multiple({
                      icon: FiTrash,
                      element: deleting ? <Spinner size="20px" /> : 'Trash',
                      func: () => handleDelete(session._id),
                    })}
                  </section>
                  <AttStatus status={session.status} />
                </div>

                <div className={`c-attendance-lists ${view}`}>
                  {view === 'list' &&
                    (session.studentRecords || []).length > 0 && (
                      <div className="c-attendance-lists-properties">
                        <p>Name</p>
                        <p>Status</p>
                        <p>Time In</p>
                        <p>Time Out</p>
                      </div>
                    )}

                  {groupStudents(session.studentRecords || []).length === 0 ? (
                    <div className="empty-attendance-state">
                      <img
                        src="/illustrations/empty.svg"
                        alt="No student records"
                      />
                      <h4>No students recorded yet</h4>
                      <p>This attendance session has no student records yet.</p>
                    </div>
                  ) : (
                    groupStudents(session.studentRecords).map((group) => (
                      <Students
                        key={group.id}
                        group={group}
                        view={view}
                        att={session}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ))
        )}
      </div>
      <PopupBox
        onClose={() => setOpenPopup(null)}
        isOpen={openPopup}>
        <ReopenSessionForm
          onSubmit={(data) => {
            console.log(data);
            console.log(openPopup);
            handleReopen(openPopup, data);
          }}
          groupId={user.group}
          load={opening}
        />
      </PopupBox>
    </>
  );
};

export default Attendance;
