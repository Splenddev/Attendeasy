import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './NoResults.module.css';

const NoResults = ({
  title = 'No results found',
  message = 'Try adjusting your filter or search term.',
  icon,
  image,
  buttonText,
  onButtonClick,
  primaryColor = 'var(--blue)',
}) => {
  const Icon = icon || FaSearch;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}>
      {image ? (
        <img
          src={image}
          alt="Empty state"
          className={styles.image}
        />
      ) : (
        <Icon
          size={60}
          color={primaryColor}
        />
      )}

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className={styles.button}
          style={{ backgroundColor: primaryColor }}
          type="button">
          {buttonText}
        </button>
      )}
    </motion.div>
  );
};

export default NoResults;
