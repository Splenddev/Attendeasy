import { motion } from 'framer-motion';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';

const Hero = () => (
  <motion.section
    className={styles.hero}
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}>
    <div className={styles.heroContent}>
      <h1 className={styles.title}>
        Welcome to <span className={styles.brand}>Vigilo</span>
      </h1>
      <p className={styles.subtitle}>
        Smart Attendance & Class Management for Modern Students
      </p>
      <p className={styles.subtext}>
        Create schedules, mark attendance, manage student groups, and stay
        connected in real time.
      </p>
      <div className={styles.ctaButtons}>
        <NavLink to={'auth/register'}>
          <button>Get Started</button>
        </NavLink>
        <NavLink to={'auth/register'}>
          <button className="outline">Join as Student</button>
        </NavLink>
        <NavLink to={'auth/register'}>
          <button className="outline">Join as Class Rep</button>
        </NavLink>
        <NavLink to={'auth'}>
          <button className="outline">Login</button>
        </NavLink>
      </div>
    </div>
  </motion.section>
);
export default Hero;
