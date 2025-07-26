import styles from './CountdownBox.module.css';
import { LuHourglass } from 'react-icons/lu';

const CountdownBox = ({ label, countdown }) => {
  return (
    <div className={styles.timer}>
      <span className={styles.icon}>
        <LuHourglass />
      </span>
      <span>
        {label}:{' '}
        <span className={styles.highlight}>
          {countdown.minutes}m {countdown.seconds}s
        </span>
      </span>
    </div>
  );
};

export default CountdownBox;
