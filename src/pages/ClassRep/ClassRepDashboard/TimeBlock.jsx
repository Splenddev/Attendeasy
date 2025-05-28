import { FiCircle } from 'react-icons/fi';
import { timeFormatter } from '../../../utils/helpers';

const TimeBlock = ({ label, time }) => (
  <div className="schedule-time">
    <span>
      <FiCircle className="icon" /> {label}
    </span>
    <p>{timeFormatter(time)}</p>
  </div>
);
export default TimeBlock;
