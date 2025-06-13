import styles from './Home.module.css';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ada O.',
    role: 'Student Rep, CS Department',
    quote:
      'Vigilo has transformed how we track class attendance and communicate with students!',
  },
  {
    name: 'John K.',
    role: '300L Student',
    quote:
      'It’s so easy to submit absence proofs and follow class updates in one place.',
  },
];

const Testimonials = () => (
  <motion.section
    className={styles.section}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}>
    <h2 className={styles.sectionTitle}>What Users Say</h2>
    <div className={styles.testimonialGrid}>
      {testimonials.map((t, i) => (
        <div
          key={i}
          className={styles.testimonialCard}>
          <p className={styles.quote}>“{t.quote}”</p>
          <p className={styles.user}>
            – {t.name}, <span>{t.role}</span>
          </p>
        </div>
      ))}
    </div>
  </motion.section>
);

export default Testimonials;
