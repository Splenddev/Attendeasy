import styles from './Home.module.css';
import { motion } from 'framer-motion';

const Demo = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={styles.sectionAlt}>
    <h2 className={styles.sectionTitle}>Live Demo & Screenshots</h2>
    <div className={styles.screenshotGrid}>
      {['Attendance Form', 'Group Management', 'Notification Center'].map(
        (demo, i) => (
          <motion.div
            key={i}
            custom={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 120 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.screenshotBox}>
            📸 {demo}
          </motion.div>
        )
      )}
    </div>
    <p className={styles.note}>*Hover previews and walkthroughs coming soon!</p>
  </motion.section>
);

export default Demo;
