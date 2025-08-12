import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({
  data = [],
  user = {},
  onSelect = () => {},
  setIsOpen,
  position,
}) => {
  const { role } = user;
  const dropdownRef = useRef();
  const [computedPos, setComputedPos] = useState(null);

  // Filter menu items
  const filteredItems = data.filter((item) => {
    if (!role) return true;
    if (!item.for) return true;
    if (Array.isArray(item.for)) return item.for.includes(role);
    return item.for === role;
  });

  // Compute position before first visible render
  useLayoutEffect(() => {
    if (dropdownRef.current && position?.buttonRect) {
      const dropdownWidth = dropdownRef.current.offsetWidth;
      let leftPos = position.buttonRect.right - dropdownWidth + window.scrollX;

      // Keep inside viewport
      if (leftPos + dropdownWidth > window.innerWidth) {
        leftPos = window.innerWidth - dropdownWidth - 8;
      }
      if (leftPos < 8) leftPos = 8;

      setComputedPos({
        top: position.top,
        left: leftPos,
      });
    }
  }, [position]);

  // Don't render until position is computed
  if (!computedPos) {
    return (
      <div
        ref={dropdownRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          top: 0,
          left: 0,
        }}
        className={styles.dropdown}>
        {filteredItems.map(({ label, icon, id, style }, index) => (
          <div
            key={id || index}
            className={styles.item}
            style={style}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return createPortal(
    <motion.div
      ref={dropdownRef}
      className={styles.dropdown}
      style={{
        position: 'absolute',
        top: computedPos.top,
        left: computedPos.left,
        zIndex: 3,
      }}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}>
      {filteredItems.map(({ label, icon, id, style }, index) => (
        <motion.button
          key={id || index}
          className={styles.item}
          whileHover={{ backgroundColor: '#f3f4f6' }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect({ label, id });
            setIsOpen(false);
          }}
          style={{ ...style }}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.label}>{label}</span>
        </motion.button>
      ))}
    </motion.div>,
    document.body
  );
};

export default Dropdown;
