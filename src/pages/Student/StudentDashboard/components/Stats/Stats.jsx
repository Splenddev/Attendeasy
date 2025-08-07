import { FaCircle } from 'react-icons/fa';
import ProgressBar from '../../ProgressBar/ProgressBar';
import './Stats.css';

const Stats = ({
  icon = null,
  text,
  value,
  showValue = false,
  progressBarValue,
  progressBarProps,
}) => {
  return (
    <div
      className="record-stat"
      key={text}>
      <ProgressBar
        value={progressBarValue}
        {...progressBarProps}
      />
    </div>
  );
};

export default Stats;
