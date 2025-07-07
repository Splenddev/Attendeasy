import { useEffect, useMemo, useState } from 'react';
import './Attendance.css';

import { AnimatePresence, motion } from 'framer-motion';
import { MdGridView, MdLocationPin, MdFlag } from 'react-icons/md';
import { RiGraduationCapFill } from 'react-icons/ri';
import { LuDownload, LuListTodo } from 'react-icons/lu';
import { FaEnvelopeOpen, FaList, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DateFilter } from '../../../components';
import button from '../../../components/Button/Button';
import { routesNavigate } from '../../../utils/helpers';
import SessionInfo from './components/SessionInfo/SessionInfo';
import Students from './components/Students/Students';
import { useFetchGroupAttendances } from '../../../hooks/useAttendance';
import { useAuth } from '../../../context/AuthContext';

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

  useEffect(() => {
    if (groupId) fetch(groupId);
  }, [groupId, fetch]);

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
        marked === '' || mapLetterToStatus[marked]?.includes(st.status);
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
    return <p className="loading-state">Fetching attendance records...</p>;
  }

  if (error) {
    return (
      <div className="error-state">
        <h4>Failed to load attendance data</h4>
        <p>{error}</p>
        <button onClick={() => fetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="c-attendance">
      <div className="c-attendance-date">
        <DateFilter
          setFilteredAttendance={setFilteredAttendance}
          attendanceList={attendanceList}
        />
      </div>

      <div className="c-attendance-create">
        {button.multiple({
          icon: FaPlus,
          name: 'create-attendance',
          element: 'Create New Attendance',
          func: () => routesNavigate('/class-rep/attendance/create'),
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

      <p className="c-attendance-length">
        Filtered <span>{sortedAttendance.length}</span> of{' '}
        <span>{attendanceList.length}</span> attendance
      </p>

      {sortedAttendance.length === 0 ? (
        <div className="empty-attendance-state">
          <img
            src="/illustrations/create.svg"
            alt="No attendance sessions"
            className="empty-image"
          />
          <h4>No attendance sessions yet</h4>
          <p>
            You haven’t created any attendance records yet. Once you do, they'll
            show up here.
          </p>
          <button onClick={() => navigate('create')}>Create</button>
        </div>
      ) : (
        sortedAttendance.map((session, idx) => (
          <AnimatePresence key={session.attendanceId || idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="c-attendance-session">
              <div className="c-attendance-info">
                <SessionInfo session={session} />

                <section className="action">
                  <button className="time">
                    <FaEnvelopeOpen /> <span>Submit to lecturer</span>
                  </button>
                  <button className="time">
                    <LuDownload />
                  </button>
                </section>
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
                      className="empty-image"
                    />
                    <h4>No students recorded yet</h4>
                    <p>
                      This attendance session has no student records at the
                      moment.
                    </p>
                  </div>
                ) : (
                  groupStudents(session.studentRecords).map((group) => (
                    <Students
                      key={group.id}
                      group={group}
                      view={view}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        ))
      )}
    </div>
  );
};

export default Attendance;
