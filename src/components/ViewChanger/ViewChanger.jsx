/* ViewChanger.jsx */
import { useState } from 'react';
import styles from './ViewChanger.module.css';

const ViewChanger = ({ views = [], defaultView, onChange }) => {
  const [active, setActive] = useState(defaultView || views[0]?.value);

  const handleChange = (value) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={styles.container}>
      {views.map((view) => (
        <button
          key={view.value}
          className={`${styles.button} ${
            active === view.value && styles.active
          }`}
          onClick={() => handleChange(view.value)}>
          {view.icon}
          {view.label && <span>{view.label}</span>}
        </button>
      ))}
    </div>
  );
};

export default ViewChanger;
