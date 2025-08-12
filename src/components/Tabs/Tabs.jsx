import styles from './Tabs.module.css';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className={styles.tabsWrap}>
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`${styles.tabButton} ${isActive ? styles.active : ''}`}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
