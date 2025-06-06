import React from 'react';
import Schedule from '../../ClassRep/ClassSchedule/Schedule/Schedule';
import { schedule } from '../../ClassRep/ClassSchedule/assets';

const StudentSchedules = () => {
  return (
    <div>
      <Schedule
        data={schedule}
        // isClassRep={true}
      />
    </div>
  );
};

export default StudentSchedules;
