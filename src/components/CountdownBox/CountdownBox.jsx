import { formatTimeLeft } from '../../utils/helpers';
import styles from './CountdownBox.module.css';
import { LuHourglass } from 'react-icons/lu';

const CountdownBox = ({ label, countdown, icon }) => {
  const { minutes = parseInt(minutes, 10), seconds = parseInt(seconds, 10) } =
    countdown;
  const timer = formatTimeLeft({ minutes, seconds }, 'human');
  return (
    <div className={styles.timer}>
      <span className={styles.icon}>{icon ? icon : <LuHourglass />}</span>
      <span className={styles.label}>
        {label}
        {countdown && (
          <>
            :{' '}
            <span className={styles.highlight}>
              {timer === '0s' ? '' : timer}
            </span>
          </>
        )}
      </span>
    </div>
  );
};

export default CountdownBox;
