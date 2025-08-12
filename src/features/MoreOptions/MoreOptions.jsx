import { FiMoreVertical } from 'react-icons/fi';
import { toggleMoreOptions } from '../../utils/helpers';
import Dropdown from '../../pages/GroupResources/components/Dropdown/Dropdown';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './MoreOptions.module.css';

const MoreOptions = ({ user, menuData, cardId }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [dropdownPos, setDropdownPos] = useState(null);
  const btnRef = useRef();

  const handleToggle = (e) => {
    e.stopPropagation();
    const rect = btnRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      buttonRect: rect,
    });
    toggleMoreOptions(cardId, setIsOpen);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.more}>
      <motion.button
        ref={btnRef}
        onClick={handleToggle}
        className={styles.icon}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <FiMoreVertical />
      </motion.button>

      <AnimatePresence>
        {isOpen === cardId && (
          <Dropdown
            setIsOpen={setIsOpen}
            setDropdownPos={setDropdownPos}
            data={menuData}
            user={user}
            position={dropdownPos}
            onSelect={(item) => console.log('Selected:', item)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoreOptions;
