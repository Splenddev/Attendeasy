import styles from './Home.module.css';
import { motion } from 'framer-motion';

const Workflow = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={styles.sectionAlt}>
    <h2 className={styles.sectionTitle}>How It Works</h2>
    <div className={styles.workflowSteps}>
      <div className={styles.step}>
        <span>1️⃣</span>
        <p>Create or Join a Class Group</p>
      </div>
      <div className={styles.step}>
        <span>2️⃣</span>
        <p>Mark Attendance & Post Updates</p>
      </div>
      <div className={styles.step}>
        <span>3️⃣</span>
        <p>Track Performance & Stay Notified</p>
      </div>
    </div>
  </motion.section>
);

export default Workflow;
