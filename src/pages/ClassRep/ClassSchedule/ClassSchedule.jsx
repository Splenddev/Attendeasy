import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import { schedule } from './assets';
import Schedule from './Schedule/Schedule';
import { FaCrown, FaPlus } from 'react-icons/fa';
import './ClassSchedule.css';
import button from '../../../components/Button/Button';
const ClassSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setNavTitle } = useAuth();
  useEffect(() => {
    setNavTitle('Class Schedules');
  }, [setNavTitle]);
  return (
    <div className="class-schedule">
      <div className="cap">
        <h2>
          <FaCrown />
          Welcome, {user.name}
        </h2>
        <NavLink to={'schedules/create'}>
          {button.multiple({
            icon: FaPlus,
            name: 'create-schedule-btn',
            element: ' New Schedule',
          })}
        </NavLink>
      </div>
      <div className="class-schedule-container">
        <Schedule
          data={schedule}
          isClassRep={user.role === 'class-rep'}
        />
      </div>
      <p
        onClick={() => {
          navigate(location.pathname + '/create');
        }}>
        Class Schedule
      </p>
      <p>{location.pathname}</p>
    </div>
  );
};

export default ClassSchedule;
