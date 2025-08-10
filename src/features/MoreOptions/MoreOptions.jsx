import { FiMoreVertical } from 'react-icons/fi';
import { toggleMoreOptions } from '../../utils/helpers';
import styles from './MoreOptions.module.css';
import Dropdown from '../../pages/GroupResources/components/Dropdown/Dropdown';

const MoreOptions = ({
  user,
  menuData,
  showDropdown,
  cardId,
  setShowDropdown = () => {},
}) => {
  return (
    <div className={styles.more}>
      <FiMoreVertical
        onClick={() => toggleMoreOptions(cardId, setShowDropdown)}
      />
      {showDropdown === cardId && (
        <Dropdown
          data={menuData}
          user={user}
          onSelect={(item) => console.log('Selected:', item)}
        />
      )}
    </div>
  );
};

export default MoreOptions;
