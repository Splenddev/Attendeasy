import Schedule from '../../ClassRep/ClassSchedule/Schedule/Schedule';
import { schedule } from '../../ClassRep/ClassSchedule/assets';

const StudentSchedules = () => {
  return (
    <>
      <Schedule
        data={schedule}
        isClassRep={false}
      />
    </>
  );
};

export default StudentSchedules;
