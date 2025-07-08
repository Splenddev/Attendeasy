import { useNavigate } from 'react-router-dom';
import styles from './JoinGroupPrompt.module.css';
import { motion } from 'framer-motion';
import { FiUserPlus, FiUsers } from 'react-icons/fi';

const JoinGroupPrompt = ({ role = 'student' }) => {
  const navigate = useNavigate();
  const isClassRep = role === 'class-rep';

  const handleNavigate = () => {
    navigate(`${role}/group-management`);
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}>
        <motion.img
          src="/illustrations/no_group.svg"
          alt="Group setup"
          className={styles.image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}>
          {isClassRep ? 'Start Your Class Group' : 'Join Your Class Group'}
        </motion.h2>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}>
          {isClassRep
            ? `As the class representative, you're the key to launching your group. By creating one, you unlock features like attendance tracking, announcements, media uploads, and absence plea handling for your class.`
            : `To gain access to attendance marking, schedules, announcements, and other class tools, you must first join your official class group. It only takes a few clicks.`}
          <br />
          <br />
          This ensures you're connected with your classmates, receive timely
          updates, and have access to your academic activities all in one place.
        </motion.p>

        <motion.button
          className={styles.ctaBtn}
          onClick={handleNavigate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}>
          {isClassRep ? (
            <>
              <FiUsers className={styles.icon} />
              Create Group
            </>
          ) : (
            <>
              <FiUserPlus className={styles.icon} />
              Join Group
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default JoinGroupPrompt;
