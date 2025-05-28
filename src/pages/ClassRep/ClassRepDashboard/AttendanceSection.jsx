import {
  FaClock,
  FaGraduationCap,
  FaUserCheck,
  FaUserTimes,
} from 'react-icons/fa';

const AttendanceSection = ({ navMenu, setNavMenu }) => (
  <div className="c-dashboard-left">
    <div className="attendance-record">
      <ul className="attendance-record-navs">
        {['today', 'yesterday'].map((day) => (
          <li
            key={day}
            className={navMenu === day ? 'active' : ''}
            onClick={() => setNavMenu(day)}>
            {day.charAt(0).toUpperCase() + day.slice(1)}'s Attendance
          </li>
        ))}
      </ul>
      <ul className="attendance-record-values">
        {[
          { icon: <FaGraduationCap />, label: 'Total Students', value: 633 },
          { icon: <FaUserCheck />, label: 'Present', value: 533 },
          { icon: <FaUserTimes />, label: 'Absent', value: 60 },
          { icon: <FaClock />, label: 'Late', value: 40 },
        ].map(({ icon, label, value }) => (
          <li key={label}>
            <p>{value}</p>
            <span>
              {icon} {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default AttendanceSection;
