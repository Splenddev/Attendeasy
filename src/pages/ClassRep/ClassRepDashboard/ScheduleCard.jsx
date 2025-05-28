import { FaBell } from 'react-icons/fa';
import { parseTimeToday } from '../../../utils/helpers';
import ClassStatus from './ClassStatus';
import TimeBlock from './TimeBlock';
import { motion } from 'framer-motion';

const ScheduleCard = ({ course, time, index }) => {
  const now = new Date();
  const start = parseTimeToday(time.start);
  const end = parseTimeToday(time.end);

  const status =
    now < start
      ? 'not-started'
      : now > start && now < end
      ? 'in-progress'
      : 'ended';

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index / 10 + 0.1, duration: 1 }}
      className={`schedule ${status}`}>
      <div className="schedule-left">
        <TimeBlock
          label="Start"
          time={time.start}
        />
        <TimeBlock
          label="End"
          time={time.end}
        />
      </div>
      <div className="schedule-right">
        <p className="title">{course.title}</p>
        <p>Lecturer: {course.lecturer}</p>
        <div className="bottom">
          <ClassStatus status={status} />
          <FaBell title="send notifications to students" />
        </div>
      </div>
    </motion.div>
  );
};
export default ScheduleCard;
