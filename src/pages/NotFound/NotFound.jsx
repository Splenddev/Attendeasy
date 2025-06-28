import { useEffect, useState } from 'react';
import {
  MdBugReport,
  MdContactSupport,
  MdDashboard,
  MdHome,
  MdPhone,
  MdHistory,
} from 'react-icons/md';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './NotFound.module.css';

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(15);

  // Countdown & auto-redirect to home
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Helpers
  const goHome = () => navigate('/');
  const goDashboard = () =>
    user?.role ? navigate(`/${user.role}/dashboard`) : goHome();
  const goBack = () => window.history.length > 1 && navigate(-1);
  const contactSupport = () =>
    window.open('mailto:support@example.com', '_blank');
  const reportBug = () => alert('Report modal coming soon!');

  return (
    <motion.main
      className={styles.container}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}>
      <motion.img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 animation"
        className={styles.image}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      />

      <h1 className={styles.heading}>404 – Page Not Found</h1>
      <p className={styles.subheading}>
        We couldn’t locate <code className={styles.code}>{pathname}</code>
      </p>

      <p className={styles.text}>
        It might have moved or never existed. Redirecting to homepage in{' '}
        <strong>{countdown}s</strong>…
      </p>

      {/* Actions */}
      <div className={styles.actions}>
        <ActionButton
          icon={MdHome}
          onClick={goHome}
          text="Home"
        />
        <ActionButton
          icon={MdDashboard}
          onClick={goDashboard}
          text="Dashboard"
        />
        <ActionButton
          icon={MdPhone}
          onClick={contactSupport}
          text="Contact Support"
        />
        <ActionButton
          icon={MdBugReport}
          onClick={reportBug}
          text="Report Issue"
        />
        <ActionButton
          icon={MdHistory}
          onClick={goBack}
          text="Go Back"
        />
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search pages, groups, schedules…"
        className={styles.search}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
          }
        }}
      />

      {/* Helpful links */}
      <div className={styles.links}>
        <h3>Helpful Links</h3>
        <ul>
          <li onClick={() => navigate('/groups/find')}>🔍 Find a Group</li>
          <li onClick={() => navigate('/announcements')}>📢 Announcements</li>
          <li onClick={() => navigate('/schedules')}>📅 Upcoming Schedules</li>
          <li onClick={() => navigate('/help')}>❓ Help Center</li>
        </ul>
      </div>
    </motion.main>
  );
};

/* Reusable Button Components */
const ActionButton = ({ icon: Icon, text, onClick }) => (
  <motion.button
    className={styles.button}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}>
    <Icon size={20} /> {text}
  </motion.button>
);

export default NotFound;
