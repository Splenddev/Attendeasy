// import { useEffect, useState } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import './Attendance.css';
// import { MdGridView, MdLocationPin } from 'react-icons/md';
// import { RiGraduationCapFill } from 'react-icons/ri';
// import { } from 'react-icons/hi';
// import { LuDownload, LuListTodo } from 'react-icons/lu';
// import { DateFilter } from '../../../components';
// import button from '../../../components/Button/Button';
// import {
//   FaChalkboardTeacher,
//   FaClock,
//   FaEnvelopeOpen,
//   FaList,
//   FaPlus,
//   FaRegCalendarCheck,
//   FaSearch,
// } from 'react-icons/fa';
// import { routesNavigate } from '../../../utils/helpers';

// const Attendance = () => {
//   const { setNavTitle, attendanceList } = useAuth();
//   const [filteredAttendance, setFilteredAttendance] = useState([]);
//   const [course, setCourse] = useState('');
//   const [marked, setMarked] = useState('');
//   const [view, setView] = useState('list');

//   useEffect(() => {
//     setNavTitle('Attendance');
//   }, []);

//   const allAttendance = filteredAttendance
//     .filter((session) => {
//       if (course !== '') return session.course === course;
//       return session;
//     })
//     .sort((a, b) => new Date(a.time) - new Date(b.time));

//   const groupStudents = (students) => {
//     if (view === 'list') {
//       return students
//         .filter((student) => {
//           if (marked !== '') return student.status === marked;
//           return student;
//         })
//         .map((student) => ({
//           id: student.name,
//           letter: null,
//           students: [student],
//         }));
//     } else {
//       return students
//         .sort((a, b) => a.name.localeCompare(b.name))
//         .filter((student) => {
//           if (marked !== '') return student.status === marked;
//           return student;
//         })
//         .reduce((groups, student) => {
//           const firstLetter = student.name.charAt(0).toUpperCase();
//           const group = groups.find((g) => g.letter === firstLetter);
//           if (group) {
//             group.students.push(student);
//           } else {
//             groups.push({
//               letter: firstLetter,
//               students: [student],
//               id: firstLetter,
//             });
//           }
//           return groups;
//         }, []);
//     }
//   };

//   return (
//     <div className="c-attendance">
//       <div className="c-attendance-date">
//         <DateFilter
//           setFilteredAttendance={setFilteredAttendance}
//           attendanceList={attendanceList}
//         />
//       </div>
//       <div className="c-attendance-create">
//         {button.multiple({
//           icon: FaPlus,
//           name: 'create-attendance',
//           element: 'Create New Attendance',
//           func: () => routesNavigate('/class-rep/attendance/create'),
//         })}
//       </div>
//       <div className="c-attendance-filter">
//         <div className="search_name">
//           <input placeholder="Search a student name here" />
//           <div className="search-icon-wrap">
//             <FaSearch />
//           </div>
//         </div>
//         <div className="filters">
//           <div className="filter-wrap">
//             <div>
//               <RiGraduationCapFill />
//               Course
//             </div>
//             <hr />
//             <select
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}>
//               <option value="">All</option>
//               <option value="Bch302">Bch302</option>
//               <option value="Bch303">Bch303</option>
//             </select>
//           </div>
//           <div className="filter-wrap">
//             <div>
//               <LuListTodo />
//               Marked
//             </div>
//             <hr />
//             <select
//               value={marked}
//               onChange={(e) => setMarked(e.target.value)}>
//               <option value="">All</option>
//               <option value="L">Late</option>
//               <option value="A">Absent</option>
//               <option value="P">Present</option>
//             </select>
//           </div>
//           <div className="c-attendance-view">
//             <span
//               className={view === 'list' ? 'active' : ''}
//               onClick={() => setView('list')}>
//               <FaList />
//             </span>
//             <span
//               className={view === 'grid' ? 'active' : ''}
//               onClick={() => setView('grid')}>
//               <MdGridView />
//             </span>
//           </div>
//         </div>
//       </div>
//       <p className="c-attendance-length">
//         Filtered <span>{allAttendance.length}</span> of{' '}
//         <span>{attendanceList.length}</span> attendance
//       </p>
//       {allAttendance?.length === 0 ? (
//         <div>
//           <p>No attendance here.</p>
//         </div>
//       ) : (
//         allAttendance.map((session) => (
//           <div
//             key={session.id}
//             className="c-attendance-session">
//             <div className="c-attendance-info">
//               <div className="class-info">
//                 <div className="location">
//                   <span>
//                     <MdLocationPin />
//                   </span>
//                   <span>Location: {session.location}</span>
//                 </div>
//                 <div className="lecturer">
//                   <span>
//                     <FaChalkboardTeacher />
//                   </span>
//                   <span>Lecturer: {session.lecturer}</span>
//                 </div>
//                 <div className="date">
//                   <span>
//                     <FaRegCalendarCheck />
//                   </span>
//                   <span>
//                     Date:{' '}
//                     {new Date(session.time).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'short',
//                       day: '2-digit',
//                     })}
//                   </span>
//                 </div>
//                 <div className="time">
//                   <span>
//                     <FaClock />
//                   </span>
//                   <span>
//                     Time:{' '}
//                     {new Date(session.time).toLocaleTimeString('en-UK', {
//                       hour12: true,
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </span>
//                 </div>
//               </div>
//               <section className="action">
//                 <button className="time">
//                   <span>
//                     <FaEnvelopeOpen />
//                   </span>
//                   <span>Submit to lecturer</span>
//                 </button>
//                 <button className="time">
//                   <LuDownload />
//                 </button>
//               </section>
//             </div>

//             <div className={`c-attendance-lists ${view}`}>
//               {view === 'list' && (
//                 <div className="c-attendance-lists-properties">
//                   <p>Name</p>
//                   <p>Role</p>
//                   <p>Status</p>
//                   <p>Time In</p>
//                   <p>Time Out</p>
//                 </div>
//               )}

//               {groupStudents(session.list).map((group) => (
//                 <div
//                   className={`c-attendance-group ${view}`}
//                   key={group.id}>
//                   {view === 'grid' && group.letter && (
//                     <div className="letter-header">
//                       {group.letter} <hr />
//                     </div>
//                   )}
//                   <div className={`c-attendance-students ${view}`}>
//                     {group.students.map((student) => (
//                       <div
//                         className={`c-attendance-student ${view}`}
//                         key={student.name}>
//                         <div className="student-name">
//                           <div className="student-img">
//                             {student.name.split('')[0].toUpperCase() +
//                               (student.name
//                                 .split(' ')[1]
//                                 ?.charAt(0)
//                                 .toUpperCase() || '')}
//                           </div>
//                           <p className="name">{student.name}</p>
//                         </div>
//                         <p>
//                           <span className="label">Role:</span>{' '}
//                           <span className="cap">{student.role}</span>
//                         </p>
//                         <div className="marks">
//                           {['P', 'A', 'L']
//                             .filter((status) =>
//                               view === 'grid'
//                                 ? status
//                                 : student.status === status
//                             )
//                             .map((status, index) => (
//                               <div
//                                 key={index}
//                                 className={`mark ${student.status === status &&
//                                   (status === 'P'
//                                     ? 'present'
//                                     : status === 'A'
//                                       ? 'absent'
//                                       : 'late')
//                                   } ${view}`}>
//                                 {status}
//                               </div>
//                             ))}
//                         </div>
//                         <p>
//                           <span className="label">In: </span>
//                           <span>
//                             {new Date(student.time.in).toLocaleTimeString([], {
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })}
//                           </span>
//                         </p>
//                         <p>
//                           <span className="label">Out: </span>
//                           <span>
//                             {new Date(student.time.out).toLocaleTimeString([], {
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })}
//                           </span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Attendance;



import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Attendance.css';
import { MdGridView, MdLocationPin } from 'react-icons/md';
import { RiGraduationCapFill } from 'react-icons/ri';
import { LuDownload, LuListTodo } from 'react-icons/lu';
import { DateFilter } from '../../../components';
import button from '../../../components/Button/Button';
import {
  FaChalkboardTeacher,
  FaClock,
  FaEnvelopeOpen,
  FaList,
  FaPlus,
  FaRegCalendarCheck,
  FaSearch,
} from 'react-icons/fa';
import { routesNavigate } from '../../../utils/helpers';

const Attendance = () => {
  const { setNavTitle, attendanceList } = useAuth();

  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [course, setCourse] = useState('');
  const [marked, setMarked] = useState('');
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setNavTitle('Attendance');
  }, [setNavTitle]);

  // Filter attendance based on selected course
  const filteredByCourse = filteredAttendance.filter((session) => {
    if (course !== '') return session.Code.toLowerCase() === course.toLowerCase();
    return true;
  });

  // Sort attendance by date (Date field in data)
  const sortedAttendance = filteredByCourse.sort((a, b) =>
    new Date(a.Date) - new Date(b.Date)
  );

  // Group students based on view and filter by attendance status + search
  const groupStudents = (students) => {
    // Filter students by status and search
    const filteredStudents = students.filter((student) => {
      const matchesStatus = marked === '' || student.status === marked;
      const matchesSearch =
        search === '' ||
        student.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    if (view === 'list') {
      return filteredStudents.map((student) => ({
        id: student.name,
        letter: null,
        students: [student],
      }));
    } else {
      return filteredStudents
        .sort((a, b) => a.name.localeCompare(b.name))
        .reduce((groups, student) => {
          const firstLetter = student.name.charAt(0).toUpperCase();
          const group = groups.find((g) => g.letter === firstLetter);
          if (group) {
            group.students.push(student);
          } else {
            groups.push({
              letter: firstLetter,
              students: [student],
              id: firstLetter,
            });
          }
          return groups;
        }, []);
    }
  };

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
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">All</option>
              <option value="BCH302">BCH302</option>
              <option value="BCH303">BCH303</option>
            </select>
          </div>
          <div className="filter-wrap">
            <div>
              <LuListTodo />
              Marked
            </div>
            <hr />
            <select value={marked} onChange={(e) => setMarked(e.target.value)}>
              <option value="">All</option>
              <option value="L">Late</option>
              <option value="A">Absent</option>
              <option value="P">Present</option>
            </select>
          </div>
          <div className="c-attendance-view">
            <span
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              <FaList />
            </span>
            <span
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
            >
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
        <div>
          <p>No attendance here.</p>
        </div>
      ) : (
        sortedAttendance.map((session, idx) => {
          // use session.id or fallback key
          const key = session.id || `${session.Code}-${session.Date}-${idx}`;

          return (
            <div key={key} className="c-attendance-session">
              <div className="c-attendance-info">
                <div className="class-info">
                  <div className="info location">
                    <MdLocationPin />
                    <span>Location: {session.Location}</span>
                  </div>
                  <div className="info lecturer">
                    <FaChalkboardTeacher />
                    <span>Lecturer: {session.Name}</span>
                  </div>
                  <div className="info date">
                    <FaRegCalendarCheck />
                    <span>
                      Date:{' '}
                      {new Date(session.DateCreated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="info time">
                    <FaClock />
                    <span>
                      Time: {session.Class_Start} - {session.Class_End}
                    </span>
                  </div>
                </div>
                <section className="action">
                  <button className="time">
                    <span>
                      <FaEnvelopeOpen />
                    </span>
                    <span>Submit to lecturer</span>
                  </button>
                  <button className="time">
                    <LuDownload />
                  </button>
                </section>
              </div>

              <div className={`c-attendance-lists ${view}`}>
                {view === 'list' && (
                  <div className="c-attendance-lists-properties">
                    <p>Name</p>
                    <p>Role</p>
                    <p>Status</p>
                    <p>Time In</p>
                    <p>Time Out</p>
                  </div>
                )}

                {groupStudents(session.list).map((group) => (
                  <div
                    className={`c-attendance-group ${view}`}
                    key={group.id}
                  >
                    {view === 'grid' && group.letter && (
                      <div className="letter-header">
                        {group.letter} <hr />
                      </div>
                    )}
                    <div className={`c-attendance-students ${view}`}>
                      {group.students.map((student) => (
                        <div
                          className={`c-attendance-student ${view}`}
                          key={student.name}
                        >
                          <div className="student-name">
                            <div className="student-img">
                              {student.name
                                .split(' ')
                                .map((n) => n.charAt(0).toUpperCase())
                                .join('')}
                            </div>
                            <p className="name">{student.name}</p>
                          </div>
                          <p>
                            <span className="label">Role:</span>{' '}
                            <span className="cap">{student.role}</span>
                          </p>
                          <div className={`marks ${view}`}>
                            {['P', 'A', 'L']
                              .filter((status) =>
                                view === 'grid'
                                  ? status
                                  : student.status === status
                              )
                              .map((status, index) => (
                                <div
                                  key={index}
                                  className={`mark ${student.status === status
                                    ? status === 'P'
                                      ? 'present'
                                      : status === 'A'
                                        ? 'absent'
                                        : 'late'
                                    : ''
                                    } ${view}`}
                                >
                                  {status}
                                </div>
                              ))}
                          </div>
                          <p>
                            <span className="label">In: </span>
                            <span>
                              {new Date(student.time.in).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </p>
                          <p>
                            <span className="label">Out: </span>
                            <span>
                              {new Date(student.time.out).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Attendance;
