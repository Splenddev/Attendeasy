import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Schedule from '../../ClassRep/ClassSchedule/Schedule/Schedule';
import { scheduleJson } from '../../ClassRep/ClassSchedule/assets';

const StudentSchedules = () => {
  const { user, setNavTitle } = useAuth();

  useEffect(() => {
    setNavTitle('My Class Schedules');
  }, [setNavTitle]);
  return (
    <>
      <Schedule
        data={scheduleJson}
        isClassRep={false}
      />
    </>
  );
};

export default StudentSchedules;
