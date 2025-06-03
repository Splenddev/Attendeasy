import { FaClock, FaFlagCheckered } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { parseTime2, parseTimeToday2 } from '../../../utils/helpers';
import ClassStatus from '../../ClassRep/ClassRepDashboard/ClassStatus';
import button from '../../../components/Button/Button';

const AttendanceCard = ({ att }) => {
  const start = parseTimeToday2(att.Class_Start);
  const end = parseTimeToday2(att.Class_End);
  const now = new Date();

  const status =
    now < start ? 'not-started' : now < end ? 'in-progress' : 'ended';
  const entryStart = parseTime2(att.Class_Start, att.Entry_Start);
  const entryEnd = parseTime2(entryStart, att.Entry_End);

  return (
    <div className="today-attendance-card">
      <div className="top">
        <p>{att.Code}</p>
        <div className="status">
          <ClassStatus status={status} />
        </div>
      </div>
      <div className="mid">
        <p>
          <GiTeacher />
          {att.Name}
        </p>
        <p>
          <MdLocationPin />
          {att.Location}
        </p>
        <div className="entries">
          <div className="entry">
            <p>
              <FaClock />
              Class Start
            </p>
            <h3>{att.Class_Start}</h3>
          </div>
          <div className="entry">
            <p>
              <FaFlagCheckered />
              Class End
            </p>
            <h3>{att.Class_End}</h3>
          </div>
          <div className="entry">
            <p>
              <FaClock />
              Entry Start
            </p>
            <h3>{entryStart}</h3>
          </div>
          <div className="entry">
            <p>
              <FaFlagCheckered />
              Entry End
            </p>
            <h3>{entryEnd}</h3>
          </div>
        </div>
      </div>
      {button.normal({ element: 'Mark', disabled: status !== 'in-progress' })}
    </div>
  );
};

export default AttendanceCard;
