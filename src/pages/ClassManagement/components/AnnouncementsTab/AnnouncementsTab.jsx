import React, { useEffect, useState, useRef } from 'react';
import styles from './AnnouncementsTab.module.css';
import gsap from 'gsap';

const getTimeRemaining = () => {
  const targetDate = new Date('2025-08-20T00:00:00');
  const now = new Date();
  const diff = targetDate - now;
  const total = Math.max(0, diff);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
};

const AnnouncementsTab = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [email, setEmail] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
    );

    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotify = () => {
    if (!email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    alert(`You'll be notified at: ${email}`);
    setEmail('');
  };

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}>
      <h1 className={styles.title}>Announcements Coming Soon</h1>
      <p className={styles.subtitle}>
        We’re cooking up a powerful announcements system for updates,
        assignments, and class info. Stay tuned!
      </p>

      <div className={styles.timer}>
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div
            key={unit}
            className={styles['time-box']}>
            <div className={styles['time-value']}>{timeLeft[unit]}</div>
            <div className={styles['time-label']}>{unit}</div>
          </div>
        ))}
      </div>

      <div className={styles['notify-form']}>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleNotify}
          className={styles.button}>
          Notify Me
        </button>
      </div>

      <div className={styles.benefits}>
        <h4>What you'll get when it's live:</h4>
        <ul>
          <li>Centralized announcement hub for all class updates</li>
          <li>Instant notifications for new assignments and events</li>
          <li>Smart filters for type, urgency, and timeline</li>
          <li>Fully responsive and mobile-optimized UI</li>
          <li>Seamless integration with attendance and scheduling</li>
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementsTab;
