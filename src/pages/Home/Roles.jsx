import styles from './Home.module.css';
import { motion } from 'framer-motion';
const Roles = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={styles.section}>
    <h2 className={styles.sectionTitle}>User Roles</h2>
    <div className={styles.rolesContainer}>
      <div className={styles.roleCard}>
        <h3>🎓 Students</h3>
        <ul>
          <li>Join class groups</li>
          <li>Mark attendance</li>
          <li>Submit absence pleas</li>
          <li>Upload assignments/media</li>
          <li>View class updates</li>
        </ul>
      </div>
      <div className={styles.roleCard}>
        <h3>🧑‍💼 Class Reps</h3>
        <ul>
          <li>Create/manage groups</li>
          <li>Post announcements</li>
          <li>Approve uploads/pleas</li>
          <li>Track attendance analytics</li>
          <li>Export class data</li>
        </ul>
      </div>
    </div>
  </motion.section>
);

export default Roles;
