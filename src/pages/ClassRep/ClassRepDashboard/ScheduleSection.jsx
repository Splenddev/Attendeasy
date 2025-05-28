import { AnimatePresence } from 'framer-motion';
import ScheduleCard from './ScheduleCard';

const ScheduleSection = ({ todaySchedules }) => (
  <div className="c-dashboard-right">
    <div className="today-schedule-wrap">
      <h2>Today's Schedules</h2>
      <div className="schedules">
        <AnimatePresence>
          {todaySchedules
            .sort((a, b) => new Date(a.time.start) - new Date(b.time.start))
            .map(({ course, time }, index) => (
              <ScheduleCard
                key={course.code}
                course={course}
                time={time}
                index={index}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
);
export default ScheduleSection;
