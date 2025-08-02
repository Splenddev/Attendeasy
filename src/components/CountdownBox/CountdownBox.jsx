import { formatTimeLeft } from '../../utils/helpers';
import styles from './CountdownBox.module.css';
import { LuHourglass } from 'react-icons/lu';

const CountdownBox = ({ label, sublabel, countdown, icon }) => {
  const { minutes = 0, seconds = 0 } = countdown || {};
  const timer = formatTimeLeft({ minutes, seconds }, 'human');

  const showTimer = timer && timer !== '0s';

  return (
    <div className={styles.timer}>
      <span className={styles.icon}>{icon ?? <LuHourglass />}</span>

      <div className={styles.textBlock}>
        <span className={styles.label}>
          {label}{' '}
          {showTimer && <span className={styles.highlight}>{timer}</span>}
        </span>

        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
    </div>
  );
};

export default CountdownBox;
