export const Tabs = ({ tabs, selected, onChange }) => (
  <div className="tabs">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        className={selected === tab.key ? 'tab active' : 'tab'}
        onClick={() => onChange(tab.key)}>
        {tab.label}
      </button>
    ))}
  </div>
);
