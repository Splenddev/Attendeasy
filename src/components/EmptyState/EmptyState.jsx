import styles from './EmptyState.module.css';
import { LuCalendarX } from 'react-icons/lu';

const EmptyState = ({
  title = 'Nothing Here Yet',
  subtitle = "Looks like there's currently no data to display.",
  icon = LuCalendarX,
  action = null,
  className = '',
}) => {
  const Icon = icon;
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.icon}>
        <Icon
          size={48}
          className={styles.iconSvg}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default EmptyState;
