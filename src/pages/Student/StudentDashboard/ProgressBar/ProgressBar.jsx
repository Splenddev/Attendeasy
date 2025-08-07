import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBar.css';

const ProgressBar = ({
  value,
  maxValue = 100,
  unit = '%',
  size = 130,
  strokeWidth = 9,
  displayMode = 'percentage', // 'percentage', 'raw', or 'onlyValue'
  showStatus = false,
  styled = false,
  label = '',
  animation = true,
  showTextInside = true,
  textSize = 30,
  roundedStroke = true,
  showTrail = true,
  statusThresholds = { poor: 40, average: 70 },
  colorMap = { poor: 'red', average: 'orange', good: 'green' },
}) => {
  const percent = Math.min((value / maxValue) * 100, 100);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.9,
  });

  useEffect(() => {
    if (!inView || !animation) {
      setAnimatedPercent(percent);
      return;
    }

    setAnimatedPercent(0);
    let current = 0;
    const step = Math.max(1, Math.floor(percent / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= percent) {
        current = percent;
        clearInterval(interval);
      }
      setAnimatedPercent(current);
    }, 50);

    return () => clearInterval(interval);
  }, [inView, percent, animation]);

  const getStatus = (p) => {
    if (p < statusThresholds.poor)
      return { text: 'POOR', color: colorMap.poor };
    if (p < statusThresholds.average)
      return { text: 'AVERAGE', color: colorMap.average };
    return { text: 'GOOD', color: colorMap.good };
  };

  const { text: statusText, color: statusColor } = getStatus(percent);

  // Determine display text based on mode
  let displayValue = '';
  switch (displayMode) {
    case 'raw':
      displayValue = `${value}${unit ? ' ' + unit : ''} / ${maxValue}${
        unit ? ' ' + unit : ''
      }`;
      break;
    case 'onlyValue':
      displayValue = `${value}${unit ? ' ' + unit : ''}`;
      break;
    default:
      displayValue = `${Math.round(percent)}${unit === '%' ? '%' : ' ' + unit}`;
  }

  return (
    <div
      className="progress-container"
      ref={ref}>
      {label && <div className="progress-label">{label}</div>}

      {showStatus && showTextInside && (
        <div
          className="status"
          style={{ color: statusColor }}>
          <p>{displayValue}</p>
          <span>{statusText}</span>
        </div>
      )}

      {styled && (
        <div
          className="styled"
          style={{ width: `${size - 26}px`, height: `${size - 26}px` }}></div>
      )}

      <div style={{ width: size, height: size }}>
        <CircularProgressbar
          value={animatedPercent}
          strokeWidth={strokeWidth}
          text={showTextInside && !showStatus ? displayValue : ''}
          styles={buildStyles({
            pathColor: statusColor,
            textColor: '#333',
            trailColor: showTrail ? '#e0e5e9' : 'transparent',
            textSize,
            pathTransitionDuration: animation ? 0.5 : 0,
            strokeLinecap: roundedStroke ? 'round' : 'butt',
          })}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
