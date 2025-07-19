import './Tabs.css';

export const Tabs = ({ tabs, selected, onChange }) => {
  return (
    <ul className="header-tabs">
      {tabs.map((tab) => (
        <li
          key={tab.key}
          className={`tab ${selected === tab.key ? 'active' : ''}`}
          onClick={() => {
            console.log(selected);
            onChange(tab.key);
          }}>
          {tab.label}
        </li>
      ))}
    </ul>
  );
};
