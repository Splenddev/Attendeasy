import styles from './Dropdown.module.css';

const Dropdown = ({ data = [], user = {}, onSelect = () => {} }) => {
  const { role } = user;

  const filteredItems = data.filter((item) => {
    if (!role) return true;

    if (!item.for) return true;

    if (Array.isArray(item.for)) {
      return item.for.includes(role);
    }

    return item.for === role;
  });

  return (
    <ul className={styles.dropdown}>
      {filteredItems.map(({ label, icon, id, style }, index) => (
        <li
          key={id || index}
          className={styles.item}
          onClick={() => onSelect({ label, id })}
          style={{ ...style }}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.label}>{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
