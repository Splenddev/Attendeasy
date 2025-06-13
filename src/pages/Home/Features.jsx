import styles from './Home.module.css';
import { motion } from 'framer-motion';

const features = [
  { icon: '🕐', title: 'Create & Manage Attendance' },
  { icon: '🧑‍🏫', title: 'Role-based Access (Student vs Class Rep)' },
  { icon: '📆', title: 'Class Schedule Management' },
  { icon: '📢', title: 'Announcements & Notifications' },
  { icon: '📎', title: 'Media & Assignment Uploads' },
  { icon: '📄', title: 'Approval Requests (Absent Pleas, Media, Group Join)' },
  { icon: '📊', title: 'Analytics & Export Tools (PDF/CSV)' },
];

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const Features = () => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Features</h2>
    <div className={styles.featureGrid}>
      {features.map((feat, i) => (
        <motion.div
          key={feat.title}
          className={styles.featureCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          custom={i}>
          <span className={styles.featureIcon}>{feat.icon}</span>
          <p>{feat.title}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Features;
