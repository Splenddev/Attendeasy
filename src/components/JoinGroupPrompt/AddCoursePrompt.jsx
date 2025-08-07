import { useNavigate } from 'react-router-dom';
import styles from './JoinGroupPrompt.module.css'; // Reuse the same CSS
import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';

const AddCoursePrompt = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/class-rep/courses');
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}>
        <motion.img
          src="/illustrations/no_courses.svg"
          alt="Add Courses"
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
          Add Courses for Your Class
        </motion.h2>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}>
          To begin tracking class progress, attendance, and academic analytics,
          start by adding your class courses. This will enable your classmates
          to interact with key tools like course tracking, lecturer info, and
          progress management.
          <br />
          <br />
          Once added, all group members will be able to view and interact with
          course-related features. It’s a vital first step in organizing your
          class academically.
        </motion.p>

        <motion.button
          className={styles.ctaBtn}
          onClick={handleNavigate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}>
          <FiBookOpen className={styles.icon} />
          Add Courses
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AddCoursePrompt;
