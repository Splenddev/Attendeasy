import Schedule from '../../ClassRep/ClassSchedule/Schedule/Schedule';
import { scheduleJson } from '../../ClassRep/ClassSchedule/assets';

const StudentSchedules = () => {
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
