import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './FullPageLoader.module.css'; // Use CSS Module
import { FaSpinner } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

const FullPageLoader = ({
  show = true,
  message = 'Loading content...',
  subMessage = 'Please wait while we fetch the latest data from Vigilo servers.',
  theme = 'light', // or 'dark'
  logo = <IoRocketSharp className={styles.logoIcon} />,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (show) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.loaderWrapper} ${styles[theme]}`}>
      <motion.div
        className={styles.loaderCard}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}>
        <div className={styles.logo}>{logo}</div>
        <h2 className={styles.message}>{message}</h2>
        <p className={styles.subMessage}>{subMessage}</p>
        <motion.div
          className={styles.spinnerWrapper}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}>
          <FaSpinner className={styles.spinner} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FullPageLoader;
